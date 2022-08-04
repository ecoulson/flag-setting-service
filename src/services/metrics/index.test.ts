import { MetricServiceModule } from "."
import { MetricRecorderModule } from "./recorder";

describe("Metric Service Module Test Suite", () => {
    const module = new MetricServiceModule();
    
    beforeAll(() => {
        module.configure();
    })

    test("Should register expected modules", () => {
        expect(module.isRegistered(MetricRecorderModule)).toBeTruthy()
    })
})