class Travel {
    constructor() {
        this.checkIns = {};  // Stores check-in data using a plain object
        this.travelTimes = {}; // Stores travel times between station pairs
    }

    // Check-in method
    checkIn(id, stationName, time) {
        this.checkIns[id] = { stationName, time }; // Store check-in data using the ID as the key
    }

    // Check-out method
    checkOut(id, stationName, time) {
        if (this.checkIns[id]) {
            const startStation = this.checkIns[id].stationName;
            const startTime = this.checkIns[id].time;

            const travelTime = time - startTime;

            const routeKey = startStation + "-" + stationName; // Create a key for the route

            if (!this.travelTimes[routeKey]) {
                this.travelTimes[routeKey] = []; // Initialize an array if the route doesn't exist
            }

            this.travelTimes[routeKey].push(travelTime); // Store the travel time for the route

            delete this.checkIns[id]; // Remove the check-in data since the trip is complete
        } else {
            console.log(`No check-in record found for ID: ${id}`);
        }
    }

    // Method to get the average travel time between two stations
    getAverageTime(startStation, endStation) {
        const routeKey = startStation + "-" + endStation; // Create a key for the route

        if (!this.travelTimes[routeKey] || this.travelTimes[routeKey].length === 0) {
            return 0; // No travel times recorded for this route
        }

        const times = this.travelTimes[routeKey]; // Get the travel times for this route
        const totalTime = times.reduce((sum, time) => sum + time, 0); // Sum up all travel times
        return totalTime / times.length; // Calculate and return the average time
    }
}

// Example usage:

const travel = new Travel();

// Sample input
travel.checkIn(1, "A", 10);    // Student 1 checks in at Station A at time 10
travel.checkOut(1, "B", 20);   // Student 1 checks out at Station B at time 20

travel.checkIn(2, "A", 15);    // Student 2 checks in at Station A at time 15
travel.checkOut(2, "B", 25);   // Student 2 checks out at Station B at time 25

// Output
const averageTime = schoolTravel.getAverageTime("A", "B");
console.log(`Average time from A to B is ${averageTime} minutes.`);
