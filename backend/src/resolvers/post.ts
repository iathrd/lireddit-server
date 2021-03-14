import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolvers {

    @Query(()=> String)
    hello() {
        return 'Hello world'
    }

}