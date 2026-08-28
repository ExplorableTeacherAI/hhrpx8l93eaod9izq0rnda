import { useState } from "react";
import { Slider, Switch, Tabs, TabsList, TabsTrigger } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";
import { asFraction } from "./probabilityFormat";

const VIEW_WIDTH = 700;
const VIEW_HEIGHT = 300;
const BAR_LEFT = 60;
const BAR_WIDTH = 540;
const BAR_HEIGHT = 42;
const ROW_Y = [56, 146, 236];

const STAGE_ONE_COLOR = "#f59e0b";
const STAGE_TWO_COLOR = "#3b82f6";
const EMPTY_COLOR = "#e2e8f0";
const WRONG_COLOR = "#dc2626";

const ROUTES = [
    { id: "late-rain", label: "Late, rain", late: true, rain: true },
    { id: "late-dry", label: "Late, dry", late: true, rain: false },
    { id: "ontime-rain", label: "On time, rain", late: false, rain: true },
    { id: "ontime-dry", label: "On time, dry", late: false, rain: false },
];

export const RouteShrinkingBar = () => {
    const lateChance = useVar("probabilityBusLate", 0.25);
    const rainChance = useVar("probabilityRain", 0.4);
    const setVar = useSetVar();
    const [routeId, setRouteId] = useState(ROUTES[0].id);
    const [showAdding, setShowAdding] = useState(false);

    const route = ROUTES.find((option) => option.id === routeId) ?? ROUTES[0];
    const firstChance = route.late ? lateChance : 1 - lateChance;
    const secondChance = route.rain ? rainChance : 1 - rainChance;
    const routeChance = firstChance * secondChance;
    const addedChance = firstChance + secondChance;

    const firstWidth = BAR_WIDTH * firstChance;
    const routeWidth = BAR_WIDTH * routeChance;
    const addedWidth = BAR_WIDTH * Math.min(addedChance, 1);

    const firstLabel = route.late ? "Bus late" : "Bus on time";
    const secondLabel = route.rain ? "rain" : "dry";

    return (
        <div className="space-y-4">
            <Tabs value={routeId} onValueChange={setRouteId}>
                <TabsList>
                    {ROUTES.map((option) => (
                        <TabsTrigger key={option.id} value={option.id}>
                            {option.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="A bar of all mornings cut down twice to leave one route"
            >
                <rect x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="#f8fafc" rx={12} />

                <text x={BAR_LEFT} y={ROW_Y[0] - 12} fontSize={13} fill="#475569">
                    Every possible morning
                </text>
                <rect
                    x={BAR_LEFT}
                    y={ROW_Y[0]}
                    width={BAR_WIDTH}
                    height={BAR_HEIGHT}
                    fill="#cbd5e1"
                    rx={6}
                />
                <text x={BAR_LEFT + BAR_WIDTH + 12} y={ROW_Y[0] + 27} fontSize={14} fontWeight={600} fill="#0f172a">
                    1
                </text>

                <text x={BAR_LEFT} y={ROW_Y[1] - 12} fontSize={13} fill="#475569">
                    First cut — keep only "{firstLabel}"
                </text>
                <rect
                    x={BAR_LEFT}
                    y={ROW_Y[1]}
                    width={BAR_WIDTH}
                    height={BAR_HEIGHT}
                    fill={EMPTY_COLOR}
                    rx={6}
                />
                <rect
                    x={BAR_LEFT}
                    y={ROW_Y[1]}
                    width={firstWidth}
                    height={BAR_HEIGHT}
                    fill={STAGE_ONE_COLOR}
                    rx={6}
                />
                <text x={BAR_LEFT + BAR_WIDTH + 12} y={ROW_Y[1] + 27} fontSize={14} fontWeight={600} fill={STAGE_ONE_COLOR}>
                    {asFraction(firstChance)}
                </text>

                <text x={BAR_LEFT} y={ROW_Y[2] - 12} fontSize={13} fill="#475569">
                    Second cut — of that piece, keep only "{secondLabel}"
                </text>
                <rect
                    x={BAR_LEFT}
                    y={ROW_Y[2]}
                    width={BAR_WIDTH}
                    height={BAR_HEIGHT}
                    fill={EMPTY_COLOR}
                    rx={6}
                />
                <rect
                    x={BAR_LEFT}
                    y={ROW_Y[2]}
                    width={firstWidth}
                    height={BAR_HEIGHT}
                    fill={STAGE_ONE_COLOR}
                    opacity={0.3}
                    rx={6}
                />
                <rect
                    x={BAR_LEFT}
                    y={ROW_Y[2]}
                    width={routeWidth}
                    height={BAR_HEIGHT}
                    fill={STAGE_TWO_COLOR}
                    rx={6}
                />
                <text x={BAR_LEFT + BAR_WIDTH + 12} y={ROW_Y[2] + 27} fontSize={14} fontWeight={600} fill={STAGE_TWO_COLOR}>
                    {asFraction(routeChance, 400)}
                </text>

                {showAdding && (
                    <g>
                        <line
                            x1={BAR_LEFT + addedWidth}
                            y1={ROW_Y[2] - 6}
                            x2={BAR_LEFT + addedWidth}
                            y2={ROW_Y[2] + BAR_HEIGHT + 8}
                            stroke={WRONG_COLOR}
                            strokeWidth={2}
                            strokeDasharray="6 4"
                        />
                        <text
                            x={Math.min(BAR_LEFT + addedWidth + 8, VIEW_WIDTH - 24)}
                            y={ROW_Y[2] + BAR_HEIGHT + 24}
                            textAnchor={addedChance > 0.8 ? "end" : "start"}
                            fontSize={12}
                            fill={WRONG_COLOR}
                        >
                            {addedChance > 1
                                ? `Adding gives more than 1 — impossible`
                                : `Adding gives ${asFraction(addedChance)} — bigger than the piece we cut from`}
                        </text>
                    </g>
                )}
            </svg>

            <div className="flex items-center gap-3">
                <Switch id="show-adding-toggle" checked={showAdding} onCheckedChange={setShowAdding} />
                <label htmlFor="show-adding-toggle" className="text-sm text-slate-700">
                    Show what adding the two branches would give
                </label>
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
