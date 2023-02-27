# TRZ (The Resident Zombie) - Backend

## Problem Description

The world, as we know it, has fallen into an apocalyptic scenario. The "Influenzer T-Virus" (a.k.a. Twiter Virus) is transforming human beings into stupid beasts (a.k.a. Zombies), hungry to cancel humans and eat their limbs.

You, the last survivor who knows how to code, will help the resistance by deploying a system to connect the remaining humans. This system will be essential to detect new infections and share resources between the members.

## Requirements

You will develop a ***RESTful API*** (yes, we care about architecture design even amid a zombie apocalypse!), which will store information about the survivors, as well as the resources they own.

To accomplish this, the API must fulfill the following use cases:

- **Add survivors to the database**

  A survivor must have a *name*, *age*, *gender* and *last location (latitude, longitude)*. We want this database to be accurate, so add basic validation for each field.

  Each survivor has their inventory of resources/items. The survivor must declare all of their resources in the sign-up process. We will believe they have what they say they have.

- **Update survivor location**

  A survivor must have the ability to update their last location, storing the new latitude/longitude pair in the base (no need to track locations, just replacing the previous one is enough).

- **Flag survivor as infected**

  In a chaotic situation like that, a survivor may inevitably get contaminated by the virus.  When this happens, we need to flag the survivor as infected.

  An infected survivor cannot trade with others, can't access/manipulate their inventory, nor be listed in the reports (infected people are kinda dead anyway, see the item on reports below). So sad when people fall for the Influenzer T-Virus.

  **A survivor is marked as infected when at least five other survivors report their contamination.**

  When a survivor is infected, their inventory items become inaccessible (they cannot trade with others). This rule HAS to be enforced in this backend system.

- **Survivors cannot Add/Remove items from inventory**

  A new user must register their belongings alongside the sign-up process. After that, they can only change their catalog through trading with other survivors. Make sure that an error in the system doesn't end up with corrupted data!

  The items allowed in the inventory are described above in the first feature.

- **Trade items**:

  Survivors can trade items among themselves.

  To do that, they must respect the price table below, where the value of an item is described in terms of points.

  Both sides of the trade should offer the same amount of points. For example, 5 Fiji water and 5 first aid pouch (5 x 14 + 5 x 10) are worth 6 AK47 (6 x 8) plus 6 Cambell Soups (6 x 12) - and yes, you will die without water for a day. You'll also die if you have a severe untreated wound. That's why those items are more expensive than weapons and food!

  The API won't store the trades, but the items will be transferred from one survivor to the other.

| Item              | Points   |
|-------------------|----------|
| 1 Fiji Water      | 14 points |
| 1 Campbell Soup   | 12 points |
| 1 First Aid Pouch | 10 points |
| 1 AK47            |  8 points  |

  As a tip, it's probably good to start the application with a reasonable amount of goods in stock, so it's easier to match prices and quantities for trading.

  Another bonus point: the servers are running hot at the bottom of a cave. Sometimes it glitches out and may stop in the middle of a trading operation. You should try to make sure you won't have corrupted inventories because of an energy shortage!! You know what I mean.
  
  The clever among you must have realized by now that someone can trade all their items for a weapon, kill everybody, and take all the food later. Yeah, that can happen. Bonus points if you have a clever solution for this conundrum.


- **Reports**

  The API must offer the following reports:

    1. Percentage of infected survivors.
    1. Percentage of non-infected survivors.
    3. The average amount of each kind of resource by the survivor (e.g. 10 Fiji Waters per survivor)
    4. Points lost because of an infected survivor.

---------------------------------------

## Notes

1. Please use one of the following languages/frameworks: *Ruby (Rails)*, *Javascript (Node + Express)*, *Java (Spring, Seam)*, *Scala (Akka)* - listed in descending order of desirability. It's also possible to implement a solution using *Python (Django)*, *PHP (Laravel)* or *Elixir (Phoenix)*, but if you want to do so, please notify us in advance.
2. No authentication is needed (it's a zombie apocalypse, no one will try to hack a system while running from a horde of zombies);
3. We still care about proper programming and architecture techniques; you must showcase that you're worthy of surviving the zombie apocalypse through the sheer strength of your skills;
4. Don't forget to make at least a minimal documentation of the API endpoints and how to use them;
5. Just to be clear: tests (unit, acceptance) are **OBLIGATORY**. We won't even look code without tests;
6. From the problem described above, you can either do a very bare-bones solution or add optional features that are not described. Use your time wisely. The absolute optimal solution might take too long to be useful in the apocalypse. So it would be best if you came up with the best possible solution that will hold up within the least amount of time and still be able to showcase your skills to prove your worth.
7. We only accept tests that implement ALL THE FEATURES described above. Incomplete tests or tests that error out won't be considered.
8. If you use Javascript, you don't need to include the `node_modules` folder. Make sure `npm install` or `yarn` just works. That makes the source code zip files much smaller and easier to attach in an e-mail.

This test must be done in one week or less. If you take MORE than one week, we won't even try evaluating. A "senior" is able to do this in just a few hours, or less.

## Sharing your solution

After finishing your implementation, DO NOT push your code to GitHub, GitLab or any other publicly available repository. You will zip the project folder (including the .git directory) and send the zip file to the person interviewing you.

**ARE YOU LOGAN PAUL ??**

