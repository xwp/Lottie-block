import {
   insertBlock,
   getEditedPostContent,
   createNewPost,
   activatePlugin,
   deactivatePlugin
 } from "@wordpress/e2e-test-utils";

jest.setTimeout(30000);

describe("Block", () => {
   it("Can add block", async () => {
     await createNewPost();
     await insertBlock("Lottie");
     expect(await getEditedPostContent()).toMatchSnapshot();
   });
 });

