import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
        <Block id="along-branch-visual" padding="sm">
            <VisualOptionCards
                blockId="along-branch-visual"
                intro="Pick how your students will see why a single route multiplies."
                cards={[
                    {
                        id: "splitting-bar",
                        title: "A full bar cut down twice, once for each stage of the route",
                        looks: "A bar standing for all possible mornings. The first cut keeps only the late-bus share; the second cut keeps only the rainy part of what is left. The surviving sliver is labelled with its fraction.",
                        manipulate: "Change the two chances and watch how much of the bar survives each cut",
                        reveals: "The second stage takes a share of a share, which is what multiplying does, so the route is always smaller than either branch",
                        targetsMisconception: "Students add along a branch instead of multiplying",
                        recommended: true,
                    },
                    {
                        id: "probability-square",
                        title: "A square split by the two chances, with the chosen route lit up as a rectangle",
                        looks: "A unit square divided into columns by the first stage and rows by the second, making four rectangles. The route being followed is highlighted, with its side lengths and area shown.",
                        manipulate: "Drag the column and row dividers to change the two chances",
                        reveals: "The route's probability is the area of its rectangle, which is one side times the other",
                        targetsMisconception: "Students add along a branch instead of multiplying",
                    },
                    {
                        id: "morning-tally",
                        title: "Many simulated mornings, with a tally of how often that one route happens",
                        looks: "Mornings generated one after another, each stamped onto its route. A running count and a running fraction sit beside the chosen route.",
                        manipulate: "Run more mornings and compare the tally with the product of the two branch fractions",
                        reveals: "The long-run fraction settles on the product, not on the sum, of the two branch chances",
                        targetsMisconception: "Students add along a branch instead of multiplying",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-along-branch-rule" maxWidth="xl">
        <Block id="along-branch-rule" padding="sm">
            <EditableParagraph id="para-along-branch-rule" blockId="along-branch-rule">
                Adding two fractions makes them bigger, so adding along a route
                cannot possibly be right. Multiplying is the operation that shrinks
                them, and shrinking is what a route needs. If your route ever comes
                out larger than one of its own branches, you have added by mistake.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
