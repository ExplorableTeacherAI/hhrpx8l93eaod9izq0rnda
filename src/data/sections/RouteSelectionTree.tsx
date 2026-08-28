import { useState } from "react";
import { Button, Slider, Tabs, TabsList, TabsTrigger } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";
import { asFraction } from "./probabilityFormat";

const VIEW_WIDTH = 700;
const VIEW_HEIGHT = 560;

const ROOT = { x: 60, y: 190 };
const STAGE_ONE_X = 250;
const STAGE_TWO_X = 430;
const STAGE_ONE_Y = [100, 280];
const STAGE_TWO_Y = [55, 145, 235, 325];

const BAR_LEFT = 60;
const BAR_WIDTH = 540;
const BAR_TOP = 470;
const BAR_HEIGHT = 44;

const ROUTES = [
    { id: "late-rain", label: "Late, rain", late: true, rain: true, color: "#2563eb" },
    { id: "late-dry", label: "Late, dry", late: true, rain: false, color: "#f59e0b" },
    { id: "ontime-rain", label: "On time, rain", late: false, rain: true, color: "#10b981" },
    { id: "ontime-dry", label: "On time, dry", late: false, rain: false, color: "#94a3b8" },
];

const QUESTIONS = [
    { id: "both", label: "Both", wording: "Both things go wrong: the bus is late and it rains.", routes: ["late-rain"] },
    {
        id: "exactly-one",
        label: "Exactly one",
        wording: "Exactly one of the two things goes wrong.",
        routes: ["late-dry", "ontime-rain"],
    },
    {
        id: "at-least-one",
        label: "At least one",
        wording: "At least one of the two things goes wrong.",
        routes: ["late-rain", "late-dry", "ontime-rain"],
    },
    { id: "neither", label: "Neither", wording: "Neither thing goes wrong.", routes: ["ontime-dry"] },
];

const sameSet = (a: string[], b: string[]) =>
    a.length === b.length && [...a].sort().join() === [...b].sort().join();

export const RouteSelectionTree = () => {
    const lateChance = useVar("probabilityBusLate", 0.25);
    const rainChance = useVar("probabilityRain", 0.4);
    const setVar = useSetVar();
    const [selected, setSelected] = useState<string[]>([]);
    const [questionId, setQuestionId] = useState(QUESTIONS[0].id);
    const [feedback, setFeedback] = useState<string | null>(null);

    const question = QUESTIONS.find((item) => item.id === questionId) ?? QUESTIONS[0];

    const chanceOf = (route: (typeof ROUTES)[number]) =>
        (route.late ? lateChance : 1 - lateChance) * (route.rain ? rainChance : 1 - rainChance);

    const toggle = (id: string) => {
        setFeedback(null);
        setSelected((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
    };

    const chosen = ROUTES.filter((route) => selected.includes(route.id));
    const total = chosen.reduce((sum, route) => sum + chanceOf(route), 0);

    let runningX = BAR_LEFT;

    return (
        <div className="space-y-4">
            <Tabs
                value={questionId}
                onValueChange={(next) => {
                    setQuestionId(next);
                    setSelected([]);
                    setFeedback(null);
                }}
            >
                <TabsList>
                    {QUESTIONS.map((item) => (
                        <TabsTrigger key={item.id} value={item.id}>
                            {item.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                {question.wording} Tick every route this covers.
            </div>

            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="A probability tree whose routes can be ticked and stacked into one bar"
            >
                <rect x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="#f8fafc" rx={12} />

                {STAGE_ONE_Y.map((parentY, parentIndex) => (
                    <g key={`stage-one-${parentIndex}`}>
                        <line
                            x1={ROOT.x}
                            y1={ROOT.y}
                            x2={STAGE_ONE_X}
                            y2={parentY}
                            stroke="#94a3b8"
                            strokeWidth={3}
                            strokeLinecap="round"
                        />
                        <text
                            x={(ROOT.x + STAGE_ONE_X) / 2}
                            y={parentIndex === 0 ? (ROOT.y + parentY) / 2 - 8 : (ROOT.y + parentY) / 2 + 22}
                            textAnchor="middle"
                            fontSize={13}
                            fill="#334155"
                        >
                            {parentIndex === 0 ? "Late" : "On time"} {asFraction(parentIndex === 0 ? lateChance : 1 - lateChance)}
                        </text>
                    </g>
                ))}

                {ROUTES.map((route, index) => {
                    const parentY = STAGE_ONE_Y[index < 2 ? 0 : 1];
                    const endY = STAGE_TWO_Y[index];
                    const isSelected = selected.includes(route.id);
                    return (
                        <g
                            key={route.id}
                            onClick={() => toggle(route.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <line
                                x1={STAGE_ONE_X}
                                y1={parentY}
                                x2={STAGE_TWO_X}
                                y2={endY}
                                stroke={isSelected ? route.color : "#cbd5e1"}
                                strokeWidth={isSelected ? 5 : 3}
                                strokeLinecap="round"
                            />
                            <text
                                x={(STAGE_ONE_X + STAGE_TWO_X) / 2}
                                y={index % 2 === 0 ? (parentY + endY) / 2 - 8 : (parentY + endY) / 2 + 22}
                                textAnchor="middle"
                                fontSize={13}
                                fill="#334155"
                            >
                                {route.rain ? "Rain" : "Dry"} {asFraction(route.rain ? rainChance : 1 - rainChance)}
                            </text>

                            <rect
                                x={STAGE_TWO_X + 16}
                                y={endY - 10}
                                width={20}
                                height={20}
                                rx={4}
                                fill={isSelected ? route.color : "#ffffff"}
                                stroke={isSelected ? route.color : "#94a3b8"}
                                strokeWidth={2}
                            />
                            {isSelected && (
                                <path
                                    d={`M ${STAGE_TWO_X + 21} ${endY} l 4 5 l 8 -10`}
                                    stroke="#ffffff"
                                    strokeWidth={2.5}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            )}
                            <text x={STAGE_TWO_X + 46} y={endY + 5} fontSize={13} fill="#334155">
                                {route.label}
                            </text>
                            <text
                                x={VIEW_WIDTH - 24}
                                y={endY + 5}
                                textAnchor="end"
                                fontSize={14}
                                fontWeight={600}
                                fill={isSelected ? route.color : "#64748b"}
                            >
                                {asFraction(chanceOf(route), 400)}
                            </text>
                        </g>
                    );
                })}

                <circle cx={ROOT.x} cy={ROOT.y} r={7} fill="#0f172a" />

                <text x={BAR_LEFT} y={BAR_TOP - 14} fontSize={13} fill="#475569">
                    The ticked routes, stacked together
                </text>
                <rect
                    x={BAR_LEFT}
                    y={BAR_TOP}
                    width={BAR_WIDTH}
                    height={BAR_HEIGHT}
                    fill="#e2e8f0"
                    rx={6}
                />
                {chosen.map((route) => {
                    const pieceWidth = BAR_WIDTH * chanceOf(route);
                    const x = runningX;
                    runningX += pieceWidth;
                    return (
                        <rect
                            key={`piece-${route.id}`}
                            x={x}
                            y={BAR_TOP}
                            width={pieceWidth}
                            height={BAR_HEIGHT}
                            fill={route.color}
                        />
                    );
                })}
                <text
                    x={BAR_LEFT + BAR_WIDTH + 12}
                    y={BAR_TOP + 28}
                    fontSize={14}
                    fontWeight={600}
                    fill="#0f172a"
                >
                    {selected.length === 0 ? "0" : asFraction(total, 400)}
                </text>
            </svg>

            <div className="flex flex-wrap items-center gap-3">
                <Button
                    onClick={() =>
                        setFeedback(
                            sameSet(selected, question.routes)
                                ? "That is the right set of routes — their probabilities add to give the answer."
                                : "Not quite. Read the wording again and check each route one at a time: does that morning match it?"
                        )
                    }
                >
                    Check my routes
                </Button>
                <Button variant="outline" onClick={() => { setSelected([]); setFeedback(null); }}>
                    Clear ticks
                </Button>
                {feedback && <span className="text-sm text-slate-700">{feedback}</span>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <div className="mb-2 text-sm text-slate-700">
                        Chance the bus is late: <span className="font-semibold">{asFraction(lateChance)}</span>
                    </div>
                    <Slider
                        value={[lateChance]}
                        min={0.05}
                        max={0.95}
                        step={0.05}
                        onValueChange={(next) => setVar("probabilityBusLate", next[0])}
                    />
                </div>
                <div>
                    <div className="mb-2 text-sm text-slate-700">
                        Chance of rain: <span className="font-semibold">{asFraction(rainChance)}</span>
                    </div>
                    <Slider
                        value={[rainChance]}
                        min={0.05}
                        max={0.95}
                        step={0.05}
                        onValueChange={(next) => setVar("probabilityRain", next[0])}
                    />
                </div>
            </div>
        </div>
    );
};
