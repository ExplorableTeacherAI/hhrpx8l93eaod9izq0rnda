import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph } from "@/components/atoms";
import { TwoStageTreeBuilder } from "./TwoStageTreeBuilder";
import { PracticeAnswer } from "./PracticeAnswer";

export const buildingTheTreeBlocks: ReactElement[] = [
    <StackLayout key="layout-building-tree-heading" maxWidth="xl">
        <Block id="building-tree-heading" padding="md">
            <EditableH2 id="h2-building-tree-heading" blockId="building-tree-heading">
                Building the Tree
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-structure" maxWidth="xl">
        <Block id="building-tree-structure" padding="sm">
            <EditableParagraph id="para-building-tree-structure" blockId="building-tree-structure">
                A two-stage event needs two sets of branches. Stage one splits into
                the possible first outcomes: the bus is late, or it is not. From
                the end of each of those, stage two splits again: it rains, or it
                does not. Every complete route from start to finish is one possible
                version of the morning.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-visual" maxWidth="xl">
        <Block id="building-tree-visual" padding="sm" hasVisualization>
            <TwoStageTreeBuilder />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-branch-sums" maxWidth="xl">
        <Block id="building-tree-branch-sums" padding="sm">
            <EditableParagraph id="para-building-tree-branch-sums" blockId="building-tree-branch-sums">
                Each branch carries its own probability. Add the stages one at a
                time and drag the two chances: the branches leaving any single
                point always add up to 1, and so do the four finished routes. That
                is the quickest way to spot a fraction you have written down wrong.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-practice-heading" maxWidth="xl">
        <Block id="building-tree-practice-heading" padding="md">
            <EditableH3 id="h3-building-tree-practice-heading" blockId="building-tree-practice-heading">
                Your turn
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-practice-missing-question" maxWidth="xl">
        <Block id="building-tree-practice-missing-question" padding="sm">
            <EditableParagraph
                id="para-building-tree-practice-missing-question"
                blockId="building-tree-practice-missing-question"
            >
                A tree is drawn for a football match. The first stage has three
                branches: Win with probability 1/5, Draw with probability 3/10, and
                Lose. What probability belongs on the Lose branch?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-practice-missing-answer" maxWidth="xl">
        <Block id="building-tree-practice-missing-answer" padding="sm">
            <PracticeAnswer
                expected={0.5}
                correctMessage="Yes — 1/5 and 3/10 make 1/2, so the last branch must be the other 1/2. Branches from one point always finish at 1."
                hints={[
                    "The three branches leave the same point, so together they must account for everything.",
                    "Add 1/5 and 3/10 first. Write them over the same denominator.",
                    "1/5 + 3/10 = 5/10. Whatever is missing has to take the total up to 1.",
                ]}
                placeholder="e.g. 1/2"
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-practice-routes-question" maxWidth="xl">
        <Block id="building-tree-practice-routes-question" padding="sm">
            <EditableParagraph
                id="para-building-tree-practice-routes-question"
                blockId="building-tree-practice-routes-question"
            >
                At the canteen you pick one of three drinks, then one of two
                snacks. If you drew the tree for that, how many complete routes
                would it end with?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-practice-routes-answer" maxWidth="xl">
        <Block id="building-tree-practice-routes-answer" padding="sm">
            <PracticeAnswer
                expected={6}
                correctMessage="Correct — each of the 3 drink branches splits into 2 snack branches, giving 6 routes. A route is one full drink-and-snack choice."
                hints={[
                    "A route is one complete journey from the start to the far right of the tree.",
                    "Draw the first stage: three branches. Now every one of those splits again. How many times?",
                    "Each of the 3 drink branches grows 2 snack branches, so count 3 lots of 2.",
                ]}
                placeholder="A whole number"
            />
        </Block>
    </StackLayout>,
];
