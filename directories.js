const fs = require('fs');

class Directory {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
}

function createDirectory(path, root) {
  let current = root;
  const components = path.split('/').filter((component) => component !== '');

  for (const component of components) {
    let found = false;
    for (const child of current.children) {
      if (child.name === component) {
        current = child;
        found = true;
        break;
      }
    }
    if (!found) {
      const newDirectory = new Directory(component);
      current.children.push(newDirectory);
      current = newDirectory;
    }
  }
}

function moveDirectory(source, destination, root) {
  const sourceComponents = source.split('/').filter((component) => component !== '');
  const destinationComponents = destination.split('/').filter((component) => component !== '');

  const sourceDirectory = findDirectory(sourceComponents, root);
  const destinationDirectory = findDirectory(destinationComponents, root);

  if (sourceDirectory && destinationDirectory) {
    destinationDirectory.children.push(sourceDirectory);
    const sourceParent = findDirectoryParent(sourceComponents.slice(0, -1), root);
    sourceParent.children = sourceParent.children.filter((child) => child !== sourceDirectory);
  }
}

function deleteDirectory(path, root) {
  const components = path.split('/').filter((component) => component !== '');
  const directory = findDirectory(components, root);

  if (directory) {
    const parent = findDirectoryParent(components.slice(0, -1), root);
    parent.children = parent.children.filter((child) => child !== directory);
  } else {
    console.log(`Cannot delete ${path} - ${components[0]} does not exist`);
  }
}


function listDirectories(current, indent = '', level = 0) {
  const currentPath = indent + current.name;

  // Skip logging for the root directory
  if (currentPath !== "/") {
    console.log(currentPath);
  }

  // Sort children array alphabetically
  const sortedChildren = current.children.sort((a, b) => a.name.localeCompare(b.name));

  for (const child of sortedChildren) {
    listDirectories(child, indent + (level >= 1 ? '  ' : ''), level + 1);
  }
}

function findDirectory(components, current) {
  for (const component of components) {
    let found = false;
    for (const child of current.children) {
      if (child.name === component) {
        current = child;
        found = true;
        break;
      }
    }
    if (!found) {
      return null;
    }
  }
  return current;
}

function findDirectoryParent(components, current) {
  for (const component of components) {
    let found = false;
    for (const child of current.children) {
      if (child.name === component) {
        current = child;
        found = true;
        break;
      }
    }
    if (!found) {
      return null;
    }
  }
  return current;
}

function readCommandsFromFile(fileName) {
  try {
    const commands = fs.readFileSync(fileName, 'utf-8').split('\n');
    return commands.filter(command => command.trim() !== ''); // Remove empty lines
  } catch (error) {
    console.error('Error reading commands from file:', error.message);
    process.exit(1);
  }
}

// Create root directory instance
const rootDirectory = new Directory('/');

// Example usage:
const fileName = process.argv[2] || 'commands.txt'; // Default filename is commands.txt
const commands = readCommandsFromFile(fileName);

for (const command of commands) {
  console.log(command)
  const parts = command.split(' ');
  if (parts[0] === 'CREATE') {
    createDirectory(parts[1], rootDirectory);
  } else if (parts[0] === 'MOVE') {
    moveDirectory(parts[1], parts[2], rootDirectory);
  } else if (parts[0] === 'DELETE') {
    deleteDirectory(parts[1], rootDirectory);
  } else if (parts[0] === 'LIST') {
    listDirectories(rootDirectory);
  }
}
