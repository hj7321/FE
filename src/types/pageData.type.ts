export type Revisions = {
  slots: {
    main: {
      "*": string;
      contentformat: string;
      contentmodel: string;
    };
  };
};

export type PageData = {
  extract: string;
  ns: number;
  original: {
    height: number;
    width: number;
    source: string;
  };
  pageid: number;
  revisions: Revisions[];
  title: string;
  missing?: string;
};

export type WikipediaApiResponse = {
  batchcomplete: string;
  query: {
    pages: {
      [key: number]: PageData;
    };
  };
  warnings: {
    extracts: { "*": string };
  };
};
