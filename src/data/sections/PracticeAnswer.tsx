import { useState } from "react";
import { Input, Button } from "@/components/atoms";

const parseValue = (raw: string): number | null => {
    const text = raw.trim().replace(/\s+/g, "");
    if (!text) return null;
    const fraction = text.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
    if (fraction) {
        const denominator = Number(fraction[2]);
        return denominator === 0 ? null : Number(fraction[1]) / denominator;
    }
    const percentage = text.match(/^(-?\d+(?:\.\d+)?)%$/);
    if (percentage) return Number(percentage[1]) / 100;
    const plain = Number(text);
    return Number.isFinite(plain) ? plain : null;
};

interface PracticeAnswerProps {
    /** The value the student should reach (decimals and fractions both accepted) */
    expected: number;
    /** How close the answer has to be */
    tolerance?: number;
    /** Message shown when the answer is right */
    correctMessage: string;
    /** Progressive nudges: first attempt gets the first hint, and so on */
    hints: string[];
    placeholder?: string;
}

export const PracticeAnswer = ({
    expected,
    tolerance = 0.001,
    correctMessage,
    hints,
    placeholder = "Your answer",
}: PracticeAnswerProps) => {
    const [entry, setEntry] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [status, setStatus] = useState<"unanswered" | "correct" | "incorrect">("unanswered");

    const check = () => {
        const value = parseValue(entry);
        if (value === null) {
            setStatus("incorrect");
            setAttempts((count) => count + 1);
            return;
        }
        if (Math.abs(value - expected) <= tolerance) {
            setStatus("correct");
            return;
        }
        setStatus("incorrect");
        setAttempts((count) => count + 1);
    };

    const hintIndex = Math.min(Math.max(attempts - 1, 0), hints.length - 1);

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    value={entry}
                    onChange={(event) => {
                        setEntry(event.target.value);
                        setStatus("unanswered");
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") check();
                    }}
                    placeholder={placeholder}
                    className="w-40"
                />
                <Button onClick={check}>Check</Button>
            </div>
            {status === "correct" && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                    {correctMessage}
                </div>
            )}
            {status === "incorrect" && (
                <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                    {hints[hintIndex]}
                </div>
            )}
        </div>
    );
};
