
export type TPost = {
  posts_id: string;
  title: string;
  content: string;
  createdAt: Date;
  lastUpdate: Date;
  postImgs: string[];
  likes: string[];
  dislikes: string[];
  excerpt: string;
  views: number;
  user_id: string;
  status: "DRAFT" | "PUBLISHED";
  suggnsToPost: string[]
}

export type TPaired = {
  comment: TComment,
  post: TPost
}


export type TReply = {
  content: string;
  user_id: string;
  replies_id: string;
  comment_id: string;
  replied_id: string;
  likes: string[],
  dislikes: string[]
}

export type TAuthor = {
  users_id: string,
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  isWarned: boolean,
  Role: string,
  createdAt: Date,
  profilePic: string
}

export type TComment = {
  content: string;
  createdAt: Date;
  lastUpdate: Date;
  likes: string[];
  dislikes: string[],
  user_id: string;
  comments_id: string;
  post_id: string;
}


export type TReplyActor = {
replier: TAuthor,
replied_to: TAuthor
}


export type TSuggestions = {
  suggns_id: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
  postsToSugg: string[];
  isVisible: boolean;
  status: "PENDING" | "ADDRESSED" | "DENIED";
  content: string;
}

export type TPageProps = {
  params:  Promise<{ postId: string }>,
  searchParams: Promise<{ search: string, page: number, limit: number }>
}
