import { TestBed } from "@angular/core/testing";
import { PeriodicRepositoryService } from "./periodic-repository.service";

describe("PeriodicRepositoryService", () => {
  let service: PeriodicRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodicRepositoryService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
