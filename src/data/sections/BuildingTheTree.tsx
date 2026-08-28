import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
        <Block id="building-tree-visual" padding="sm">
            <VisualOptionCards
                blockId="building-tree-visual"
                intro="Pick how your students will meet the structure of a two-stage tree."
                cards={[
                    {
                        id: "grow-branches",
                        title: "A tree that grows one stage at a time as students add each set of branches",
                        looks: "An empty starting point with a button to add stage one, then stage two. Branches appear with their labels and fractions, and the four finished routes are listed at the ends.",
                        manipulate: "Add each stage in turn, and change the two chances to see every fraction on the tree update",
                        reveals: "A two-stage tree always ends in four routes, and the branches leaving any one point add up to 1",
                        recommended: true,
                    },
                    {
                        id: "hundred-students",
                        title: "A hundred students walking through the two stages and splitting into four groups",
                        looks: "A hundred small figures at the school gate. They split into two crowds at stage one, and each crowd splits again at stage two, leaving four labelled groups.",
                        manipulate: "Change the chance of a late bus or of rain and watch the four group sizes shift",
                        reveals: "Each route on the tree is simply one of the four groups, and the four groups always account for everyone",
                    },
                    {
                        id: "two-spinners",
                        title: "Two spinners spun in turn, with the matching route on the tree lighting up",
                        looks: "A bus spinner and a weather spinner side by side, with a blank tree next to them. Spinning them lights the route that just happened.",
                        manipulate: "Spin the two spinners and watch which of the four routes lights up each time",
                        reveals: "Every spin lands on exactly one route, so the four routes cover all the possibilities without overlapping",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-building-tree-branch-sums" maxWidth="xl">
        <Block id="building-tree-branch-sums" padding="sm">
            <EditableParagraph id="para-building-tree-branch-sums" blockId="building-tree-branch-sums">
                Each branch carries its own probability. The branches leaving any
                single point are the only things that can happen there, so they
                always add up to 1. That one fact is what keeps a tree honest, and
                it is the quickest way to spot a missing fraction.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
