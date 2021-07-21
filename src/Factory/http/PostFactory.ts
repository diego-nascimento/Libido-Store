import { PostData, PostInfra } from './Protocols'

export const PostFactory = () => {
  const PostInfraInfra = new PostInfra()
  return new PostData(PostInfraInfra)
}
