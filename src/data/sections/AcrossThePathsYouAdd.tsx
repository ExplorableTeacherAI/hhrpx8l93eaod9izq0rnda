import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
        <Block id="across-paths-visual" padding="sm">
            <VisualOptionCards
                blockId="across-paths-visual"
                intro="Pick how your students will see why separate routes are added together."
                cards={[
                    {
                        id: "select-routes",
                        title: "A tree where students tick the routes a question covers and watch them stack into one bar",
                        looks: "The finished tree with a tick box on each of the four routes. Ticked routes slide across as coloured pieces that stack on top of each other in a single bar.",
                        manipulate: "Tick the routes that match a given question and read the height of the stacked bar",
                        reveals: "Chosen routes pile up rather than shrink, so separate routes are added, and ticking all four always gives exactly 1",
                        targetsMisconception: "Students multiply separate paths instead of adding them",
                        recommended: true,
                    },
                    {
                        id: "shaded-square",
                        title: "A square of all mornings with every region matching the question shaded together",
                        looks: "The unit square divided into four rectangles, one per route. The rectangles that answer the current question are shaded, and their combined area is shown.",
                        manipulate: "Switch between questions such as both, exactly one, and at least one, and watch which regions shade",
                        reveals: "The answer is the total shaded area, so the separate regions are summed, and it can never be smaller than any single region",
                        targetsMisconception: "Students multiply separate paths instead of adding them",
                    },
                    {
                        id: "sorted-mornings",
                        title: "Simulated mornings dropped into four buckets that students then combine",
                        looks: "Mornings falling into four labelled buckets, one per route, with counts rising. Buckets can be joined together into a single group.",
                        manipulate: "Choose which buckets a question needs and combine them into one count",
                        reveals: "Combining buckets means totalling their counts, which is adding, and the combined group is always the larger one",
                        targetsMisconception: "Students multiply separate paths instead of adding them",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-across-paths-rule" maxWidth="xl">
        <Block id="across-paths-rule" padding="sm">
            <EditableParagraph id="para-across-paths-rule" blockId="across-paths-rule">
                Each route is already a finished probability, and separate routes
                are alternatives rather than steps. Alternatives are added.
                Multiplying two routes together would drag the answer below either
                one of them, which is the wrong direction entirely.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
