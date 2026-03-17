# Normalization

## Motivation 💪🏻
Imagine you are starting out with an e-commerce website. You design the pages, get your items, enlist them in your website and make it live🌐. Now, when the orders come, you have to store in a table. So, make a table with the name *myBigTableThatHasAllTheData*😁 and start writing data. This is not a good practice for several reasons. Lets break down each one of them ...

Let's say we maintain a food court. I am gonna trivialize the details for easy understanding. Let's consider the orders:

### Flat way

|Customer Name|Item Name|Store Name|Total Order Price|Purchase Time|
|:-:|:-:|:-:|:-:|:-:|
|Hungry Man1|Pizza|Pizza in 5|608.03|2026-01-05 19:47:08|
|Hungry Man1|Burger|Burg Me In|203.87|2026-01-05 19:47:08|
|Hungry Man2|Pizza|Pizza in 5|196.27|2026-01-07 11:15:18|
|Hungry Man2|Ice Cream|Dreamy Creamy|85.79|2026-01-07 13:27:49|
|Hungry Man1|Ice Cream|Dreamy Creamy|401.43|2026-01-07 22:35:28|
|Hungry Man1|Burger|Burg Me In|1247.22|2026-01-08 22:35:28|


### Normalized way🤘🏻

|CustId|Customer Name|
|:-:|:-:|
|H01|Hungry Man1|
|H02|Hungry Man2|

|ItemId|Item Name|Store Name|
|:-:|:-:|:-:|
|It01|Pizza|Pizza in 5|
|It02|Burger|Burg Me In|
|It03|Ice Cream|Dreamy Creamy|

|OrderId|CustId|ItemId|TotalPrice|Purchase Time|
|:-:|:-:|:-:|:-:|:-:|
|1|H01|It01|608.03|2026-01-05 19:47:08|
|2|H01|It02|203.87|2026-01-05 19:47:08|
|3|H02|It02|196.27|2026-01-07 11:15:18|
|4|H02|It03|85.79|2026-01-07 13:27:49|
|5|H01|It03|401.43|2026-01-07 22:35:28|
|6|H01|It02|1247.22|2026-01-08 22:35:28|

This is the normalized way, where we have all the complicated *Ids* referring to other tables. Why go through the pain🤕 of all this ...


## Redundancy
Count the number of characters consumed to store data the flat way. Lets assume any character (a number or an alphabet or anything else for that matter) consumes 1 byte of storage. Count the total number...

Take your time🕛... but it will be ~266 bytes and for the normalized way it comes to ~246 bytes. It does not look impressive, but this saving becomes more pronounced when there are huge number of rows

## Updates
Lets say, we need to change the name of that Pizza place from *Pizza in 5* to *Pizza5*. We can run an update query on the flat way, which would update it at 2 places. Currently it is 2 for a small table, but as the data grows this number would also grow

But in the normalized way, it would update in exactly 1 row in the Store table. So, its faster⏩ and safer

## Deletion anomaly
Lets say you delete the records for *Hungry Man2* from the flat table. Then there would be no indication from the Database that he ever existed

Lets say you delete that entry from the Orders table, his identity would still exist in the *Customer table*. 

This is useful in other ways too. Imagine a scenario where we are storing the shipping🚢 address in the flat table. If the Hungry Man's order is deleted, so is his address. Next time, he orders something, he needs to enter his address again. But in the normalized way, since the details are stored in another place, the info is safe🔒. This not only applies to address, but any personal info like credit card💳 info, preference on website etc...

## Foreign key relationships
Foreign key relationships are an important part of Relationship DataBase Management Systems (RDBMS). It prevents orphan records

Lets say, we are blocking🫥 Hungry Man1 from our system. He might have ordered too many burgers🍔 from our website. Or he might just be a test user🧑🏻‍💻, and we want to delete these records before going live (Now, you might be thinking, we delete all records before going live, but... lets say we created this user to test a coupon🎟️ or a new feature or to fix a bug🐞 ...). In either case, if we delete the record from Customer table, the records from Orders table will automatically get deleted. This is called cascading effect, and the database automatically handles that. In fact, this feature is so well integrated that we can set the database to either cascade, insert *NULL*, or some default value, or raise error because some other table depends in this table

## Website design
Lets say you are listing items from your DB on to the website. It is sufficient to expose only the *Store table* as it helps populate the items in the website. The other 2 tables can be kept safely away and we can expose info from it only when needed (like when user is logged in and connection is secure🔐, or for ADMIN🥷🏻 panel etc ...). This decreases the attack surface🤺

## Disadvantages
Normalized way, is the way. Loud and clear. But like all things in this world, this way has its disadvantages

### Don't normalize everything
Here, in the above example, suppose the store table was once again normalized

#### Store Flat way

|ItemId|Item Name|Store Name|
|:-:|:-:|:-:|
|It01|Pizza|Pizza in 5|
|It02|Burger|Burg Me In|
|It03|Ice Cream|Dreamy Creamy|

#### Store Normalized way

|ItemId|Item Name|Store Id|
|:-:|:-:|:-:|
|It01|Pizza|S01|
|It02|Burger|S02|
|It03|Ice Cream|S03|

|Storeid|Store Name|
|:-:|:-:|
|S01|Pizza In 5|
|S02|Burg Me In|
|S03|Dreamy Creamy|

We can observe that it did not yield us a good benefit. In fact it made it worse. Now we just added a bunch of Ids that occupy more space than the flat version. So, we must be aware how much and how many tables need normalization


### Difficult to remember the JOINs

Generally speaking, there are many tables in the system. And to acquire the necessary information, the analyst must remember which tables to *JOIN* and on what keys🔑. If the tables are heavily normalized, then number of JOINs increases accordingly

That is the reason why, during analysis, data is not stored in normalized way. Otherwise, even for simple data to make sense, we need to JOIN many tables