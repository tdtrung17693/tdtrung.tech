import {getPosts as getDbPosts} from '@/services/data.service'

export  function getPosts(ghName: string, ghRepo: string) {
    return getDbPosts(ghName, ghRepo)
}
