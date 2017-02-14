/****************
Shabab Islam 
100815199
2406 Assignment 1
*****************/


function Node(value){
	this.value = value;
	this.left = null;
	this.right = null;
}

function Tree(){
	this.root = null;
	var output = "";
	var contains = false;
	var largestVal = null;
	var smallestVal = null;

	this.insert = function(val){
		var newNode = new Node(val);
		var currentNode = this.root;
		
		if(val.constructor !==Array){ /*If the input parameter is NOT an array*/
			if (!this.root){ /*if the tree is empty, add to root*/
				this.root = newNode;
				return;
			}

			while(currentNode){ /*if not empty, check values and add to left or right depending on the value*/
				if(val === currentNode.value){
					return;
				}
				if(val > currentNode.value){
					if(!currentNode.right){
						currentNode.right = newNode;
						break;
					} else {
						currentNode = currentNode.right;
					}
				} else {
					if(!currentNode.left){
						currentNode.left = newNode;
						break;
					} else {
						currentNode = currentNode.left;
					}
				}
			}
		} else { /*if the input paramenter is an array, iterate through array and add each number individually*/
			for (var i = 0;i<val.length;i++){
				this.insert(val[i]);
			}
		}
	}

	
	this.remove = function(val){
		/*helper function, does dfs and sets the node and it's subtree to null*/
		function deleteTree(node){
			if(node){
				deleteTree(node.left);
				node.value = undefined;
				deleteTree(node.right);
			}
		} 
		
		/*traverse through main tree, finds corresponding value, uses helper function to destroy subtree*/
		function removeTraverse(node){
			if (node){
				removeTraverse(node.left);
				if(val === node.value){
					deleteTree(node);
				} else {
					removeTraverse(node.right);
				}
			}
		}
		
		removeTraverse(this.root);
		
	}
	
	
	this.toString = function(){
		/*iterates, adds to output string and prints it out. Everything else is formatting*/
		output = "'";
		iter4(this.root);
		if(output.charAt(output.length-1) === "'"){
			output+="'";
		} else {
			output = output.substr(0,output.length-1) + "'";
		}
		console.log(output);
	}
	
	
	function iter4(node,val){
		/*helper function doing multiple things
		
		Iterates through list and:
			1) adds the values to output string in ascending order
			2) determines what the smallest value is
			3) determines largest value
			4)checks if it contains a specific value		
		
		*/
		if(node){
			
			/*#1*/
			iter4(node.left, val);
			if(node.value){
				output+=node.value + ",";
			}
			
			/*#2*/
			if(node.value<smallestVal || smallestVal ===null){
				smallestVal = node.value;
			}

			/*#3*/
			if(node.value>largestVal || largestVal ===null){
				largestVal = node.value;
			}
			
			/*#4*/
			if(node.value===val){
				contains = true;
			}

			iter4(node.right, val);
		}	
	}

	/*The following 3 functions runs helper function and returns corresponding value*/
	
	this.findLargest = function(){

		if(this.root!== null){
			iter4(this.root);
			return largestVal;
		}
	}
	
	this.findSmallest = function(){
		if(this.root!== null){
			iter4(this.root);
			return smallestVal;
		}
	}
	
	this.contains = function(val){
		contains = false;
		iter4(this.root,val);
		return contains;
	}
	
	
	this.isEmpty = function(){
		if(this.root===null){
			return true;
		} else {
			return false;
		}
	}
	
	this.isLeaf = function(){
		if(this.root == null){
			return false;
		}
		if(this.root.left == null && this.root.right == null){
			return true;
		} else {
			return false;
		}
	}
		
	/*Creates  and returns new tree, goes through old tree and inserts values in new tree*/
	this.copy = function(){
		var newTree = new Tree();
	
		function iter5(node){
			if(node){

				iter5(node.left);
				if(node.value!=null){
					newTree.insert(node.value);
				}
				iter5(node.right);
			}
		}
		iter5(this.root);
		
		return newTree;
	}
	
	/*Traverses and applies function*/
	this.treeMap = function(func){		
		function iter(node){
			if(node){
				iter(node.left);
				node.value = func(node.value);
				iter(node.right);
			}
		}
		iter(this.root);

	}
	
}

/*Tests all functions*/
function test(){
	var testTree = new Tree();

	console.log("----------------------------------");		
	console.log("Is the tree empty? Expected output: True. Actual output: ");
	console.log(testTree.isEmpty());
	console.log("Printing empty tree. Expected output: ''. Actual output: ");
	testTree.toString();
	console.log("----------------------------------");
	console.log("Adding 6 to tree. Expected output: '6'. Actual output: ")
	testTree.insert(6);
	testTree.toString();
	console.log("----------------------------------");
	console.log("Is this a leaf? Expected output: True. Actual output:");
	console.log(testTree.isLeaf());
	console.log("Is the tree empty? Expected output: False. Actual output:: ");
	console.log(testTree.isEmpty());
	console.log("----------------------------------");
	console.log("Inserting an array as paramenter: [3,1,4,7,9,3,20,6] which contains duplicates.")
	testTree.insert([3,1,4,7,9,3,20,6]);
	
	console.log("Expected value: 1,3,4,6,7,9,20. Actual output:");
	testTree.toString();
	console.log("----------------------------------");
	console.log("Does the tree contain 5? Expected output: False. Actual output: ");
	console.log(testTree.contains(5));
	console.log("Does the tree contain 3? Expected output: True. Actual output: ");		
	console.log(testTree.contains(3));
	console.log("The largest value: Expected output: 20. Actual output: ");
	console.log(testTree.findLargest());
	
	console.log("The smallest value: Expected output: 1. Actual output: ");
	console.log(testTree.findSmallest());
	console.log("----------------------------------");
	
	console.log("Removing subtree rooted at 3. Expected output: '6,7,9,20'. Actual output:")
	testTree.remove(3);
	testTree.toString();
		
	console.log("Creating a copy of tree. Make planet greener. Adding [88,23,53] to new tree.")
	var treeCopy = testTree.copy();
	
	treeCopy.insert([88,23,53]);
	console.log("Tree copy: Expected output: '6,7,9,20,23,53,88'. Actual output: ");
	treeCopy.toString();
	console.log("Old tree: Expected output: '6,7,9,20'. Actual output: ");
	testTree.toString();
	console.log("----------------------------------");
	console.log("Creating square and divide functions to test treemap function.")
	var square = function(x){ return x*x};
	var divide = function(x){ return x/2};
	
	console.log("Treemap function. Squaring old tree elements, dividing new tree elements by 2:")
	testTree.treeMap(square);
	treeCopy.treeMap(divide);
		
	console.log("Old tree after mapping, expected out: '36,49,81,400'. Actual output:");
	testTree.toString();
	console.log("New tree after mapping, expected out: '3,3.5,4.5,10,11.5,26.5,44'. Actual output:");
	treeCopy.toString();
	console.log("----------------------------------");
	console.log("Tests complete. Go nuts.")
	console.log("----------------------------------");
	console.log("");
	console.log("Functions available for user:");
	console.log("----------------------------------");
	console.log("Tree() - creates a brand new empty tree.");
	console.log(".insert(value): inserts value(s), can be single input or array of inputs.");		
	console.log(".remove(value): removes given value if found in tree.");
	console.log(".isEmpty(): checks if tree is empty, returns true or false.");
	console.log(".isLeaf(): checks if tree is leaf, returns true or false.");	
	console.log(".contains(value): checks if value is in tree, returns true or false.");
	console.log(".findLargest(): returns highest value in tree.");
	console.log(".findSmallest(): returns smallest value in tree.");
	console.log(".copy(): creates and returns new, separate copy of the original tree.");
	console.log(".toString(): prints out tree.");
	console.log(".treeMap(func): function callback. Applies the function to all elements of the tree. The callback function can be user-defined, takes in a single input and has return value.");
}

module.exports.Tree = Tree;
module.exports.test = test;
