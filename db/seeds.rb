# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Deck.create([
    { name: "Math", left: "Multiply", right: "Add" },
    { name: "Algorithms", left: "Runtime", right: "Description" },
    { name: "States", left: "Abbreviation", right: "Capitol" }
    ])

Card.create([
    { name: "5, 5", left: "25", right: "10", deck_id: 1 },
    { name: "2, 4", left: "8", right: "6", deck_id: 1 },
    { name: "3, 6", left: "18", right: "9", deck_id: 1 },
    { name: "5, 8", left: "40", right: "13", deck_id: 1 },


    { name: "Selection sort", left: "O(n^2)", 
        right: "Find the smallest remaining number in the unsorted subarray and
        place it in index 0. Repeat for indices 1...n.", 
        deck_id: 2 },
    { name: "Merge sort", left: "O(n lg n)", 
        right: "Recursively split the array in half. Base case: arrays 
        of length 2. Sort each sub-array and recursively merge.", 
        deck_id: 2 },
    { name: "Bubble sort", left: "O(n^2)", 
        right: "Iterate through the array from left to right. For any pair of neighbors,
        switch their positions if the number on the left is greater than the right.
        Repeat until array is sorted.", 
        deck_id: 2 },
    
    { name: "California", left: "CA", right: "Sacramento", deck_id: 3 },
    { name: "Texas", left: "TX", right: "Austin", deck_id: 3 },
    { name: "New York", left: "NY", right: "Albany", deck_id: 3 },
    { name: "Washington", left: "WA", right: "Olympia", deck_id: 3 },
    { name: "Nevada", left: "NV", right: "Carson City", deck_id: 3 }

    ])