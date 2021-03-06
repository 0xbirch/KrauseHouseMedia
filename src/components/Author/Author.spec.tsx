import { render, screen } from "@testing-library/react";

import { useAuthorResult } from "@/hooks/use-author";
import sampleAuthor from "@/sample-data/sample-author";

import Author from "./Author";

let authorResult = {
  author: sampleAuthor,
  isLoading: false,
  error: undefined,
} as useAuthorResult;
jest.mock("@/hooks/use-author", () => {
  return jest.fn(() => authorResult);
});

describe("Author", () => {
  it("should render component", () => {
    // arrange
    render(<Author authorId="" />);

    // act
    const author = screen.getByTestId("author");

    // assert
    expect(author).toBeInTheDocument();
  });

  it("should render author image", () => {
    // arrange
    render(<Author authorId="" />);

    // act
    const authorImage = screen.getByTestId("author-image");

    // assert
    expect(authorImage).toBeInTheDocument();
  });

  it("should not render post info when none provided", () => {
    // arrange
    render(<Author authorId="" />);

    // act
    const postInfo = screen.queryByTestId("post-info");

    // assert
    expect(postInfo).not.toBeInTheDocument();
  });

  it("should render date when provided", () => {
    // arrange
    render(<Author authorId="" date={new Date(2022, 0, 10)} />);

    // act
    const postInfo = screen.queryByTestId("post-info");
    const date = screen.getByText("Jan 10, 2022", { exact: false });

    // assert
    expect(postInfo).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });

  it("should render read time when provided", () => {
    // arrange
    render(<Author authorId="" readTime="10 min read" />);

    // act
    const postInfo = screen.queryByTestId("post-info");
    const readTime = screen.getByText("10 min read", { exact: true });

    // assert
    expect(postInfo).toBeInTheDocument();
    expect(readTime).toBeInTheDocument();
  });

  it("should render read time and date together", () => {
    // arrange
    render(
      <Author authorId="" date={new Date(2022, 0, 10)} readTime="10 min read" />
    );

    // act
    const postInfo = screen.queryByTestId("post-info");
    const date = screen.getByText("Jan 10, 2022", { exact: false });
    const readTime = screen.getByText("10 min read", { exact: false });

    // assert
    expect(postInfo).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(readTime).toBeInTheDocument();
  });

  it("should not render author name if loading", () => {
    // arrange
    givenAuthorLoading();
    render(
      <Author
        authorId="sdakbndawnkj"
        date={new Date(2022, 0, 10)}
        readTime="10 min read"
      />
    );

    // act
    const author = screen.queryByText(sampleAuthor.name, { exact: false });

    // assert
    expect(author).not.toBeInTheDocument();
  });

  it("should not render author name if error", () => {
    // arrange
    givenAuthorError();
    render(
      <Author
        authorId="sdakbndawnkj"
        date={new Date(2022, 0, 10)}
        readTime="10 min read"
      />
    );

    // act
    const author = screen.queryByText(sampleAuthor.name, { exact: false });

    // assert
    expect(author).not.toBeInTheDocument();
  });

  it("should not render author name", () => {
    // arrange
    givenAuthor();
    render(
      <Author
        authorId="sdakbndawnkj"
        date={new Date(2022, 0, 10)}
        readTime="10 min read"
      />
    );

    // act
    const author = screen.getByText(sampleAuthor.name, { exact: false });

    // assert
    expect(author).toBeInTheDocument();
  });
});

const givenAuthor = () => {
  authorResult = {
    author: sampleAuthor,
    isLoading: false,
    error: undefined,
  } as useAuthorResult;
};

const givenAuthorLoading = () => {
  authorResult = {
    author: sampleAuthor,
    isLoading: true,
    error: undefined,
  } as useAuthorResult;
};

const givenAuthorError = () => {
  authorResult = {
    author: sampleAuthor,
    isLoading: false,
    error: { message: "error" },
  } as useAuthorResult;
};
