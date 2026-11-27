import { parsePublicMarketplaceQuery } from "@/lib/marketplace/parse-public-marketplace-query";
import { Category } from "@prisma/client";
import { describe, expect, test } from "vitest";

describe("parsePublicMarketplaceQuery", () => {
  test("uses the route category and the public page size", () => {
    expect(
      parsePublicMarketplaceQuery(
        { category: "Finance", page: "2", pageSize: "100", rewardType: "sale" },
        Category.Design,
      ),
    ).toMatchObject({
      category: Category.Design,
      page: 2,
      pageSize: 24,
      rewardType: "sale",
    });
  });

  test("falls back to defaults while preserving the route category", () => {
    expect(
      parsePublicMarketplaceQuery(
        { page: "invalid", sortBy: "recency" },
        Category.AI,
      ),
    ).toStrictEqual({
      category: Category.AI,
      pageSize: 24,
      sortBy: "popularity",
      sortOrder: "desc",
    });
  });
});
