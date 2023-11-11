interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

type Columns = 'id' | 'title' | 'body' | 'userId';

export default PostsDataTypes;
