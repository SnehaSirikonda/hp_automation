/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { IDS, CSS_IDS, TEST_DATA_IDS } from "../support/utils/testids";
const one_time_purchase = "One-time purchase: ";
let item_title = "";

Given("I am on Amazon page", () => {
  cy.visit("/");
});

When("I enter {string} in the search box", (searchItem) => {
  cy.get(IDS.SEARCH_TEXT_BOX).type(searchItem);
});

When("I submit search button", () => {
  cy.get(IDS.SEARCH_SUBMIT_BUTTON).click();
});

Then("I should be taken to {string} results page", (result) => {
  cy.url().should("include", result);
});

When("I add an item to the cart", () => {
  cy.get(TEST_DATA_IDS.SEARCH_RESULTS).should("have.length.gt", 5);
  cy.get(TEST_DATA_IDS.SEARCH_RESULTS).first().click();
});

Then("I should be on item detail page", () => {
  cy.get(IDS.FEATURE_TITLE).should("be.visible");
});

Then("I should see quantity {int} to be selected", (quantity) => {
  cy.get(IDS.QUANTITY)
    .find("option")
    .eq(0)
    .should("have.value", quantity)
    .and("have.attr", "selected");
});

Then("I should be taken to the cart page", () => {
  cy.url().should("include", "cart");
});

Then("I should see item confirmation", () => {
  cy.get(IDS.ITEM_CONFIRMATION).should("be.visible");
});

When("I click on Add to Basket button", () => {
  cy.contains(one_time_purchase).then(($el) => {
    if ($el.length) {
      cy.contains(one_time_purchase).click();
    }
  });
  cy.get(IDS.ADD_TO_BASKET).click();
});

Then("I should see {string} success message", (message) => {
  cy.contains(message);
});

When("I remove the item from cart", () => {
  cy.get(TEST_DATA_IDS.DELETE).should("be.visible");
  cy.wait(500);
  cy.get(TEST_DATA_IDS.DELETE).click();
});

Then("I should not see the item confirmation container", () => {
  cy.get(IDS.ITEM_CONFIRMATION).should("not.be.visible");
});

Then("I should see item {string} message", (removeMsg) => {
  cy.get(CSS_IDS.REMOVE_ITEM_MSG).should("include.text", removeMsg);
});

Then("I accept cookies", () => {
  cy.get(IDS.ACCEPT_COOKIES).click({ force: true });
});

When("I click sandwich menu", () => {
  cy.get(IDS.SANDWICH_MENU).click();
});

Then("I should see the menu opened", () => {
  cy.get(IDS.MENU_CONTENT).should("be.visible");
});

When("I click on first item from menu", () => {
  cy.get("a.hmenu-item")
    .eq(0)
    .then((item) => {
      item_title = item.text();
      cy.log(item_title);
      cy.get(item).click();
    });
});

Then("I should be taken to item details page", () => {
  cy.get(IDS.BANNER_TEXT).should("have.text", "Amazon " + item_title);
});

When("I click on Todays deal", () => {
  cy.contains("Today's Deals").click();
});

Then("I should be taken to deals page", () => {
  cy.url().should("include", "deals");
  cy.get(TEST_DATA_IDS.DEALS_HEADER)
    .find("h1")
    .should("have.text", "Today's Deals");
});

When("I click on first deal", () => {
  cy.get(TEST_DATA_IDS.DEAL_CARD).eq(0).click();
});

When("I click on first item in deal", () => {
  cy.get("li").eq(0).click();
});

When("I add to the cart", () => {
  cy.get(IDS.ADD_TO_BASKET).click();
});

When("I close the suggestions popup", () => {
  cy.contains("No thanks").then(($el) => {
    if ($el.length) {
      cy.get(IDS.POP_UP).within(() => {
        cy.get(CSS_IDS.BUTTON).eq(2).click();
      });
    }
  });
});

Then("I should see Basket count {int}", (count) => {
  cy.get(IDS.CART_COUNT).should("have.text", count);
});

When("I click on proceed to checkouts", () => {
  cy.get(TEST_DATA_IDS.PROCEED_TO_CHECKOUT).click();
});

Then("I should be taken to {string} page", (page) => {
  cy.url().should("include", page);
});
