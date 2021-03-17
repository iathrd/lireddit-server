import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {

  const [{data}] = usePostsQuery()

  return (
    <>
      <Navbar />
      <div>Hello world</div>
      <br/>
      {!data? <div>loading...</div> : data.posts.map(data=>(
        <div key={data.id} >{data.title}</div>
      ))}
    </>
  );
};

export default withUrqlClient(createUrqlClient,{ssr:true})(Index);
