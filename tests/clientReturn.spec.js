import { test, expect } from "@playwright/test";
import orderData from "./jsons/orderData.json";
import mpReturnData from "./jsons/mpReturnData.json";

import { delay } from "./functionsGeneral/delay";
import { createDeliveredOrder } from "./functions/createDeliveredOrder";
import { mpReturnCreate } from "./functionsReturn/mpReturnCreate";

test("mp-client-returns-creator test", async ({ request, page }) => {
  const orderContext = await createDeliveredOrder(request, page, orderData);
  await delay(3000);
  mpReturnData.parcelStorageId = orderContext.parcelId;
  const returnId = await mpReturnCreate(request, mpReturnData);
  orderContext.returnId = returnId;
  expect(orderContext.returnId).toBeDefined;
  console.log(orderContext);
});
