import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph } from "@/components/atoms";
import { RouteSelectionTree } from "./RouteSelectionTree";
import { PracticeAnswer } from "./PracticeAnswer";

export const acrossThePathsYouAddBlocks: ReactElement[] = [
    <StackLayout key="layout-across-paths-heading" maxWidth="xl">
        <Block id="across-paths-heading" padding="md">
            <EditableH2 id="h2-across-paths-heading" blockId="across-paths-heading">
                Across the Paths, You Add
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-setup" maxWidth="xl">
        <Block id="across-paths-setup" padding="sm">
            <EditableParagraph id="para-across-paths-setup" blockId="across-paths-setup">
                Not every question points at a single route. "Exactly one thing goes
                wrong" is true on two different routes, and "at least one thing goes
                wrong" is true on three. So the first move in any tree question is
                to work out which routes the wording actually covers.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-visual" maxWidth="xl">
        <Block id="across-paths-visual" padding="sm" hasVisualization>
            <RouteSelectionTree />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-rule" maxWidth="xl">
        <Block id="across-paths-rule" padding="sm">
            <EditableParagraph id="para-across-paths-rule" blockId="across-paths-rule">
                Ticked routes pile up rather than shrink, because each route is
                already a finished probability and separate routes are alternatives
                rather than steps. Alternatives are added. Tick all four and the bar
                fills exactly, which is the check that nothing has been missed or
                counted twice.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-practice-heading" maxWidth="xl">
        <Block id="across-paths-practice-heading" padding="md">
            <EditableH3 id="h3-across-paths-practice-heading" blockId="across-paths-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-practice-quiz-question" maxWidth="xl">
        <Block id="across-paths-practice-quiz-question" padding="sm">
            <EditableParagraph
                id="para-across-paths-practice-quiz-question"
                blockId="across-paths-practice-quiz-question"
            >
                In a quiz round, Ann answers correctly with probability 3/5 and Ben
                with probability 1/2, independently of each other. What is the
                probability that exactly one of them answers correctly?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-practice-quiz-answer" maxWidth="xl">
        <Block id="across-paths-practice-quiz-answer" padding="sm">
            <PracticeAnswer
                expected={0.5}
                correctMessage="Yes — Ann right and Ben wrong gives 3/10, Ann wrong and Ben right gives 1/5, and those two routes add to 1/2. Multiply along each route, then add the routes."
                hints={[
                    "'Exactly one' is true on two different routes. Find both before you calculate anything.",
                    "The two routes are: Ann correct with Ben wrong, and Ann wrong with Ben correct. Work out each one on its own first.",
                    "You should have 3/10 and 1/5. These are alternatives, not steps — tick two routes in the tree above and watch what the bar does to them.",
                ]}
                placeholder="e.g. 1/2"
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-block-1787920430849" maxWidth="xl">
        <Block id="block-1787920430849" padding="sm">
            <EditableParagraph id="para-block-1787920430849" blockId="block-1787920430849">Since the probability of each of them answering the question correctly is independent of each other, so the answer would be 1/2</EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-practice-faulty-question" maxWidth="xl">
        <Block id="across-paths-practice-faulty-question" padding="sm">
            <EditableParagraph
                id="para-across-paths-practice-faulty-question"
                blockId="across-paths-practice-faulty-question"
            >
                A machine makes two items, each faulty with probability 1/10 and
                independent of the other. What is the probability that at least one
                of the two items is faulty?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-practice-faulty-answer" maxWidth="xl">
        <Block id="across-paths-practice-faulty-answer" padding="sm">
            <PracticeAnswer
                expected={0.19}
                tolerance={0.002}
                correctMessage="Correct — the three routes give 1/100, 9/100 and 9/100, adding to 19/100. Subtracting the 'neither faulty' route from 1 gets you there faster."
                hints={[
                    "'At least one' does not mean 'exactly one'. How many of the four routes have a fault somewhere?",
                    "Three routes match. Work out each one, then combine them — or find the one route with no fault at all and take it away from 1.",
                    "The no-fault route is 9/10 x 9/10 = 81/100. Everything else is the answer.",
                ]}
                placeholder="e.g. 19/100"
            />
        </Block>
    </StackLayout>,
];
