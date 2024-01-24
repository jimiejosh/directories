# Directory Management System

This Node.js application simulates a directory management system where you can create, move, and delete directories. It reads a sequence of commands and outputs the resulting directory structure.

## How to Run

1. Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

2. Clone or download this repository.

3. Open a terminal and navigate to the directory where the code is located.

4. Run the following command to execute the directory management script:

    ```bash
    node directories.js [filename]
    ```

    Replace `[filename]` with the name of the file containing your commands. If no filename is provided, it will default to `commands.txt`.

## Commands

The application understands the following commands:

- `CREATE <directory>`: Creates a new directory.
- `MOVE <source> <destination>`: Moves a directory from the source path to the destination path.
- `DELETE <directory>`: Deletes a directory.
- `LIST`: Lists the current directory structure.

## Example

Consider the following input:

```plaintext
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
```

The expected output would be:



```plaintext
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
  grains
  vegetables
    squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
  fruits
  grains
  vegetables
    squash

```

