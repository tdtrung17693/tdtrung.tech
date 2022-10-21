import {getPost as getDbPost} from '@/services/data.service'

export function getPost(ghName: string, ghRepo: string, postId: string) {
    return getDbPost(ghName, ghRepo, postId)
}
