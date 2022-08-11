import { Tag } from "./TagsResponse";

export interface TagsProps {
    tags: Array<Tag>
}

export type TagCloudData = Array<TagCloudDataEntry>

export interface TagCloudDataEntry {
    value: string,
    count: number,
    key?: number
}