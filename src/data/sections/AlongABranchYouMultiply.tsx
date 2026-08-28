import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph } from "@/components/atoms";
import { RouteShrinkingBar } from "./RouteShrinkingBar";
import { PracticeAnswer } from "./PracticeAnswer";

export const alongABranchYouMultiplyBlocks: ReactElement[] = [
    <StackLayout key="layout-along-branch-heading" maxWidth="xl">
        <Block id="along-branch-heading" padding="md">
            <EditableH2 id="h2-along-branch-heading" blockId="along-branch-heading">
                Along a Branch, You Multiply
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-setup" maxWidth="xl">
        <Block id="along-branch-setup" padding="sm">
            <EditableParagraph id="para-along-branch-setup" blockId="along-branch-setup">
                Take one single route: the bus is late, and then it rains. Both
                things have to happen, one after the other, for that route to be
                the morning you get. So the chance of the pair must be smaller than
                the chance of either one on its own. Whatever we do with the two
                fractions has to make the answer shrink.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-visual" maxWidth="xl">
        <Block id="along-branch-visual" padding="sm" hasVisualization>
            <RouteShrinkingBar />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-rule" maxWidth="xl">
        <Block id="along-branch-rule" padding="sm">
            <EditableParagraph id="para-along-branch-rule" blockId="along-branch-rule">
                For two things to happen one after the other, multiply their two
                probabilities. That is exactly what the second cut does: it takes
                a share of a share, so the answer always comes out smaller than
                either branch on its own. Switch the toggle on and you will see
                adding land outside the piece we were cutting from.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-practice-heading" maxWidth="xl">
        <Block id="along-branch-practice-heading" padding="md">
            <EditableH3 id="h3-along-branch-practice-heading" blockId="along-branch-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-practice-keeper-question" maxWidth="xl">
        <Block id="along-branch-practice-keeper-question" padding="sm">
            <EditableParagraph
                id="para-along-branch-practice-keeper-question"
                blockId="along-branch-practice-keeper-question"
            >
                A goalkeeper saves any penalty with probability 2/5, and each
                penalty is independent of the last. In a shoot-out, what is the
                probability that she saves the first two penalties?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-practice-keeper-answer" maxWidth="xl">
        <Block id="along-branch-practice-keeper-answer" padding="sm">
            <PracticeAnswer
                expected={0.16}
                correctMessage="Right — 2/5 x 2/5 = 4/25. Two saves in a row is one route through the tree, so the two branch chances multiply and the result is smaller than a single save."
                hints={[
                    "Two saves in a row is one single route through a two-stage tree. What do you do along a route?",
                    "Your answer should be smaller than 2/5, because saving twice is harder than saving once.",
                    "Set both chances to 2/5 in the bar above and look at the second cut: it is 2/5 of 2/5.",
                ]}
                placeholder="e.g. 4/25"
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-practice-spotting-question" maxWidth="xl">
        <Block id="along-branch-practice-spotting-question" padding="sm">
            <EditableParagraph
                id="para-along-branch-practice-spotting-question"
                blockId="along-branch-practice-spotting-question"
            >
                A student follows a route whose two branches are 1/3 and 1/2, and
                writes down 5/6. That answer is wrong. What should the probability
                of that route be?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-practice-spotting-answer" maxWidth="xl">
        <Block id="along-branch-practice-spotting-answer" padding="sm">
            <PracticeAnswer
                expected={0.16666667}
                tolerance={0.002}
                correctMessage="Exactly — 1/3 x 1/2 = 1/6. The student added the branches instead of multiplying, which is why their answer came out larger than either branch."
                hints={[
                    "Look at where 5/6 came from: it is 1/3 + 1/2. Is adding what a route asks for?",
                    "The answer must be smaller than 1/3, since both things have to happen.",
                    "Set the chances close to 1/3 and 1/2 in the bar above and see how small the second cut becomes.",
                ]}
                placeholder="e.g. 1/6"
            />
        </Block>
    </StackLayout>,
];
