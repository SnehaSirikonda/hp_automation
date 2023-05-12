Feature: Amazon add and remove item from basket

	As a user,
	I should be able to add an item to basket,
	then remove the item from the basket

	Background:
		Given I am on Amazon page
		And I accept cookies

	Scenario: User should be able to search an item perfume, add to cart and remove it
		When I enter "perfume" in the search box
		And I submit search button
		Then I should be taken to "perfume" results page
		When I add an item to the cart
		Then I should be on item detail page
		And  I should see quantity 1 to be selected
		When I click on Add to Basket button
		Then I should be taken to the cart page
		And  I should see Basket count 1
		And  I should see item confirmation
		And  I should see "Added to Basket" success message
		When I remove the item from cart
		Then I should not see the item confirmation container
		And  I should see Basket count 0
		And  I should see item "was removed from Shopping Basket." message

	Scenario: User should able to select an item from sandwich menu
		When I click sandwich menu
		Then I should see the menu opened
		And I click on first item from menu
		And I should be taken to item details page

	Scenario: User should be able to add an item from Today's deal to cart and proceed to checkout
		When I click on Todays deal
		Then I should be taken to deals page
		When I click on first deal
		And  I click on first item in deal
		And  I add to the cart
		And  I close the suggestions popup
		And  I should see Basket count 1
		And  I click on proceed to checkouts
		Then I should be taken to "signin" page
