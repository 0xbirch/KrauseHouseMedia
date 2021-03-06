import { render, screen } from "@testing-library/react";

import { useAuthorResult } from "@/hooks/use-author";
import sampleAuthor from "@/sample-data/sample-author";
import Content from "@/types/content";

import ContentCard from "./ContentCard";

const content = {
  id: "1",
  title: "The best way to predict the future is to create it.",
  imageUrl:
    "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  authorId: "1",
} as Content;

const authorResult = {
  author: sampleAuthor,
  isLoading: false,
  error: undefined,
} as useAuthorResult;
jest.mock("@/hooks/use-author", () => {
  return jest.fn(() => authorResult);
});

describe("ContentCard", () => {
  it("should render content card", () => {
    // arrange
    render(<ContentCard content={content} />);

    // act
    const contentCard = screen.getByTestId("content-card");

    // assert
    expect(contentCard).toBeInTheDocument();
  });

  it("should render image, title, author, and description", () => {
    // arrange
    render(<ContentCard content={content} />);

    // act
    const image = screen.getByTestId("image");
    const title = screen.getByText(content.title, { exact: true });
    const author = screen.getByTestId("author");
    const description = screen.getByText(content.description, { exact: true });

    // assert
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
