// var COLLISION = [
//     [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1]
// ];

// var start = [0, 0];
// var end = [13, 12];

// var path = findWay(start, end);
// console.log(JSON.stringify(path))

function findWay(position, end) {
    var queue = [];

    COLLISION[position[0]][position[1]] = 1;
    queue.push([position]); // store a path, not just a position

    while (queue.length > 0) {
        var path = queue.shift(); // get the path out of the queue
        var pos = path[path.length - 1]; // ... and then the last position from it
        var direction = [
            [pos[0] + 1, pos[1]],
            [pos[0], pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0], pos[1] - 1]
        ];

        for (var i = 0; i < direction.length; i++) {
            // Perform this check first:
            if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
                // return the path that led to the find
                return path.concat([end]);
            }

            if (
                direction[i][0] < 0 ||
                direction[i][0] >= COLLISION[0].length ||
                direction[i][1] < 0 ||
                direction[i][1] >= COLLISION[0].length ||
                COLLISION[direction[i][0]][direction[i][1]] != 0
            ) {
                continue;
            }

            COLLISION[direction[i][0]][direction[i][1]] = 1;
            // extend and push the path on the queue
            queue.push(path.concat([direction[i]]));
        }
    }

    // Can't solve
    return 0
}

