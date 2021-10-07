import {act, render} from "@testing-library/react";
import {ApiProvider, useListImages} from "./api-provider";
import * as mockImages from "../__test__/mock-images.json"
import fetchMock from "jest-fetch-mock"
import {useEffect} from "react";
import {ImageModel} from "../data/models";

describe("Api Provider", () => {

    beforeEach(() => fetchMock.mockClear())

    it('should load correctly', async () => {
        let list: (limit: number, page: number) => Promise<void> | undefined;
        let data: ImageModel[] | undefined;
        const TestComponent = () => {
            const listImages = useListImages()
            useEffect(() => {
                list = listImages.list
                data = listImages.data
            }, [listImages])
            return <div/>
        }

        render(
            <ApiProvider apiKey={"test-key"}>
                <TestComponent/>
            </ApiProvider>
        )
        fetchMock.mockOnce(JSON.stringify(mockImages))

        expect(list!).toBeDefined()

        await act(async () => await list(100,0))

        expect(data?.length).toBe(mockImages.length)

    });
})
