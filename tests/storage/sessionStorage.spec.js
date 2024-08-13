import {expect, test} from "@playwright/test";

test.describe("Session Storage", ()=> {
    test.only("setup guest cars in session storage", async({page})=>{
        const sessionStorageKey = "guestData"
        
        await page.goto('/')
        await page.locator('button', {hasText: 'Guest log in'}).click()
        
        await page.locator('button', {hasText: 'Add car'}).click()

        const popup = page.locator('.modal-content')
        const mileageInput = page.locator('#addCarMileage')
        await mileageInput.fill("777")

        await popup.locator('button', {hasText: "Add"}).click()

        await expect(page.locator('.car-heading')).toBeVisible()

        const userData = await page.evaluate(
            (key)=> window.sessionStorage.getItem(key),
            sessionStorageKey,
        )
         const parsed = JSON.parse(userData)
             parsed.cars.push({
                "id": 1,
                "brand": "BMW",
                "model": "X6",
                "logo": "bmw.png",
                "initialMileage": 777,
                "updatedMileageAt": "2024-08-11T16:09:27.019Z",
                "carCreatedAt": "2024-08-11T16:09:27.019Z",
                "carBrandId": 2,
                "carModelId": 9,
                "mileage": 777
              })

             const stringified = JSON.stringify(parsed)

             await page.evaluate(
                ({key, data})=> window.sessionStorage.getItem(key, data), 
                
                {
                key: sessionStorageKey, 
                data: stringified
                }
            )
            await page.pause()
    })
})