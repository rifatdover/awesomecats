export interface ImageModel {
    id: string;
    width: number;
    height: number;
    original_filename: string;
    created_at: Date,
    sub_id: string
    url: string;
}
export interface FavoriteResponseModel {
    id: string;
    message: string

}
export interface FavoriteModel {
    "created_at": Date,
    "id": string,
    "image": {
        "id": string,
        "url": string
    },
    "image_id": string,
    "sub_id": string
}

export interface VoteModel {
    "id": string,
    "image_id": string,
    "sub_id": string,
    "value": 1 | 0
}
