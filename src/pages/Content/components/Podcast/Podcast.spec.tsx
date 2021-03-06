import { render, screen } from "@testing-library/react";

import { usePodcastResult } from "@/hooks/use-podcast";
import samplePodcast from "@/sample-data/sample-podcast";

import Podcast from "./Podcast";

let podcastResult: usePodcastResult;
jest.mock("@/hooks/use-podcast", () => {
  return jest.fn(() => podcastResult);
});

describe("Podcast", () => {
  beforeEach(() => {
    podcastResult = {
      podcast: samplePodcast,
      isLoading: false,
      error: undefined,
    } as usePodcastResult;
  });

  it("should render loader while loading", () => {
    podcastResult.isLoading = true;
    // arrange
    render(<Podcast id={"1"} />);

    // act
    const loaderObject = screen.getByTestId("loading");

    // assert
    expect(loaderObject).toBeInTheDocument();
  });

  it("should render content card", () => {
    // arrange
    render(<Podcast id={"1"} />);

    // act
    const podcastObject = screen.getByTestId("podcast");

    // assert
    expect(podcastObject).toBeInTheDocument();
  });

  it("should render subcomponents", () => {
    // arrange
    render(<Podcast id={"1"} />);

    // act
    const content = screen.getByTestId("content");

    // assert
    expect(content).toBeInTheDocument();
  });
});
