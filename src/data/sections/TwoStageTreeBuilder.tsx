import { useState } from "react";
import { Button, Slider } from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

const VIEW_WIDTH = 700;
const VIEW_HEIGHT = 380;

const ROOT = { x: 60, y: 190 };
const STAGE_ONE_X = 250;
const STAGE_TWO_X = 430;
const STAGE_ONE_Y = [100, 280];
const STAGE_TWO_Y = [55, 145, 235, 325];

const LATE_COLOR = "#f59e0b";
const ONTIME_COLOR = "#64748b";
const RAIN_COLOR = "#3b82f6";
const DRY_COLOR = "#94a3b8";

const greatestCommonDivisor = (a: number, b: number): number =>
    b === 0 ? a : greatestCommonDivisor(b, a % b);

/** Turn a probability that is a multiple of 0.05 into a tidy fraction such as 3/20 */
const asFraction = (value: number, denominator = 20): string => {
    const numerator = Math.round(value * denominator);
    if (numerator === 0) return "0";
    const divisor = greatestCommonDivisor(numerator, denominator) || 1;
    const bottom = denominator / divisor;
    return bottom === 1 ? `${numerator / divisor}` : `${numerator / divisor}/${bottom}`;
};

interface BranchProps {
    from: { x: number; y: number };
    to: { x: number; y: number };
    color: string;
    label: string;
    chance: string;
    above: boolean;
}

const Branch = ({ from, to, color, label, chance, above }: BranchProps) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    return (
        <g>
            <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={color}
                strokeWidth={3}
                strokeLinecap="round"
            />
            <text
                x={midX}
                y={above ? midY - 20 : midY + 30}
                textAnchor="middle"
                fontSize={13}
                fill="#334155"
            >
                {label}
            </text>
            <text
                x={midX}
                y={above ? midY - 5 : midY + 45}
                textAnchor="middle"
                fontSize={14}
                fontWeight={600}
                fill={color}
            >
                {chance}
            </text>
        </g>
    );
};

export const TwoStageTreeBuilder = () => {
    const lateChance = useVar("probabilityBusLate", 0.25);
    const rainChance = useVar("probabilityRain", 0.4);
    const setVar = useSetVar();
    const [stage, setStage] = useState(0);

    const onTimeChance = 1 - lateChance;
    const dryChance = 1 - rainChance;

    const routes = [
        { name: "Late, rain", value: lateChance * rainChance, color: RAIN_COLOR },
        { name: "Late, dry", value: lateChance * dryChance, color: DRY_COLOR },
        { name: "On time, rain", value: onTimeChance * rainChance, color: RAIN_COLOR },
        { name: "On time, dry", value: onTimeChance * dryChance, color: DRY_COLOR },
    ];

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    onClick={() => setStage((current) => Math.min(current + 1, 2))}
                    disabled={stage === 2}
                >
                    {stage === 0 ? "Add stage one" : stage === 1 ? "Add stage two" : "Tree complete"}
                </Button>
                <Button variant="outline" onClick={() => setStage(0)}>
                    Start again
                </Button>
            </div>

            <svg
                width="100%"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                role="img"
                aria-label="A two-stage probability tree for a late bus and rain"
            >
                <rect x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="#f8fafc" rx={12} />

                {stage >= 1 && (
                    <>
                        <Branch
                            from={ROOT}
                            to={{ x: STAGE_ONE_X, y: STAGE_ONE_Y[0] }}
                            color={LATE_COLOR}
                            label="Bus late"
                            chance={asFraction(lateChance)}
                            above
                        />
                        <Branch
                            from={ROOT}
                            to={{ x: STAGE_ONE_X, y: STAGE_ONE_Y[1] }}
                            color={ONTIME_COLOR}
                            label="Bus on time"
                            chance={asFraction(onTimeChance)}
                            above={false}
                        />
                    </>
                )}

                {stage >= 2 &&
                    STAGE_ONE_Y.map((parentY, parentIndex) =>
                        [0, 1].map((childIndex) => {
                            const isRain = childIndex === 0;
                            const endY = STAGE_TWO_Y[parentIndex * 2 + childIndex];
                            return (
                                <Branch
                                    key={`branch-stage-two-${parentIndex}-${childIndex}`}
                                    from={{ x: STAGE_ONE_X, y: parentY }}
                                    to={{ x: STAGE_TWO_X, y: endY }}
                                    color={isRain ? RAIN_COLOR : DRY_COLOR}
                                    label={isRain ? "Rain" : "Dry"}
                                    chance={asFraction(isRain ? rainChance : dryChance)}
                                    above={isRain}
                                />
                            );
                        })
                    )}

                <circle cx={ROOT.x} cy={ROOT.y} r={7} fill="#0f172a" />
                <text x={ROOT.x} y={ROOT.y + 28} textAnchor="middle" fontSize={12} fill="#475569">
                    Morning
                </text>

                {stage >= 1 &&
                    STAGE_ONE_Y.map((y, index) => (
                        <circle
                            key={`node-stage-one-${index}`}
                            cx={STAGE_ONE_X}
                            cy={y}
                            r={6}
                            fill={index === 0 ? LATE_COLOR : ONTIME_COLOR}
                        />
                    ))}

                {stage >= 2 &&
                    STAGE_TWO_Y.map((y, index) => (
                        <g key={`route-${index}`}>
                            <circle cx={STAGE_TWO_X} cy={y} r={6} fill={routes[index].color} />
                            <text x={STAGE_TWO_X + 20} y={y + 5} fontSize={13} fill="#334155">
                                {routes[index].name}
                            </text>
                            <text
                                x={VIEW_WIDTH - 24}
                                y={y + 5}
                                textAnchor="end"
                                fontSize={14}
                                fontWeight={600}
                                fill="#0f172a"
                            >
                                {asFraction(routes[index].value, 400)}
                            </text>
                        </g>
                    ))}

                {stage === 0 && (
                    <text x={VIEW_WIDTH / 2} y={VIEW_HEIGHT / 2} textAnchor="middle" fontSize={15} fill="#94a3b8">
                        Press "Add stage one" to start the tree
                    </text>
                )}
            </svg>

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

            <div className="text-sm text-slate-600">
                {stage >= 1 && (
                    <span>
                        Stage one: {asFraction(lateChance)} + {asFraction(onTimeChance)} = 1
                    </span>
                )}
                {stage >= 2 && (
                    <span>
                        {"  ·  "}The four routes also add to 1
                    </span>
                )}
            </div>
        </div>
    );
};
