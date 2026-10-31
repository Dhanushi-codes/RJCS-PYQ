console.log("ANSWER BANK LOADED");

window.manualAnswers = {
    "With the help of an example explain Binary Tree Traversal.": `
        <h3>Binary Tree Traversal</h3>

        <p>Binary Tree Traversal is the process of visiting every node of a binary tree exactly once in a particular order.</p>

        <p>Consider the following binary tree:</p>

        <pre>
        A
       / \\
      B   C
     / \\   \\
    D   E   F
        </pre>

        <h4>1. Preorder Traversal</h4>
        <p>Order: <b>Root → Left → Right</b></p>
        <p><b>A → B → D → E → C → F</b></p>

        <h4>2. Inorder Traversal</h4>
        <p>Order: <b>Left → Root → Right</b></p>
        <p><b>D → B → E → A → C → F</b></p>

        <h4>3. Postorder Traversal</h4>
        <p>Order: <b>Left → Right → Root</b></p>
        <p><b>D → E → B → F → C → A</b></p>

        <p>Thus, binary tree traversal is used to visit and process all nodes of a binary tree in a systematic manner.</p>
    `,

    "What is Binary tree? Explain binary tree traversals with the help of an example.": `
        <h3>Binary Tree</h3>

        <p>A binary tree is a tree data structure in which each node can have <b>at most two children</b>, called the left child and right child.</p>

        <h3>Binary Tree Traversals</h3>

        <h4>1. Preorder Traversal</h4>
        <p>Root → Left → Right</p>
        <p><b>A → B → D → E → C → F</b></p>

        <h4>2. Inorder Traversal</h4>
        <p>Left → Root → Right</p>
        <p><b>D → B → E → A → C → F</b></p>

        <h4>3. Postorder Traversal</h4>
        <p>Left → Right → Root</p>
        <p><b>D → E → B → F → C → A</b></p>
    `,

    "What is binary tree? Explain different terms related to tree with the help an diagram.": `
        <h3>Binary Tree</h3>

        <p>A binary tree is a tree in which each node can have <b>at most two children</b>, known as the left child and right child.</p>

        <h3>Terms Related to a Tree</h3>

        <p><b>1. Root:</b> The topmost node of a tree.</p>

        <p><b>2. Parent:</b> A node that has one or more children.</p>

        <p><b>3. Child:</b> A node directly connected below another node.</p>

        <p><b>4. Leaf Node:</b> A node having no children.</p>

        <p><b>5. Internal Node:</b> A node having at least one child.</p>

        <p><b>6. Siblings:</b> Nodes having the same parent.</p>

        <p><b>7. Edge:</b> The connection between two nodes.</p>

        <p><b>8. Degree:</b> The number of children of a node.</p>

        <p><b>9. Level:</b> The position of a node from the root.</p>

        <p><b>10. Height:</b> The number of edges in the longest path from the root to a leaf.</p>


    `,

        "What is Heap? Explain the types of heap with the help of an example.": `
        <h3>Heap</h3>

        <p>
            A heap is a special tree-based data structure that
            satisfies the heap property.
        </p>

        <h4>Types of Heap</h4>

        <h4>1. Max Heap</h4>

        <p>
            In a Max Heap, the value of the parent node is
            greater than or equal to the values of its children.
            Therefore, the maximum element is present at the root.
        </p>

        <h4>Example:</h4>

        <pre>
           90
          /  \
        70    60
       /  \
     40    50
        </pre>

        <h4>2. Min Heap</h4>

        <p>
            In a Min Heap, the value of the parent node is
            smaller than or equal to the values of its children.
            Therefore, the minimum element is present at the root.
        </p>

        <h4>Example:</h4>

        <pre>
           10
          /  \
        20    30
       /  \
     40    50
        </pre>

        <p>
            Thus, the two main types of heap are Max Heap
            and Min Heap.
        </p>
    `,

    "Solve the following list of elements using Max heap: 44, 33, 77, 11, 55, 88, 66": `
        <h3>Max Heap</h3>

        <p>
            Given elements:
            <b>44, 33, 77, 11, 55, 88, 66</b>
        </p>

        <p>
            The elements are arranged so that every parent
            node is greater than or equal to its children.
        </p>

        <h4>Final Max Heap:</h4>

        <pre>
             88
           /    \
         55      77
        /  \    /  \
      11   44  33   66
        </pre>

        <p>
            Therefore, the resulting Max Heap has
            <b>88</b> as the root element.
        </p>
    `,

    "Write a short note on heap.": `
        <h3>Heap</h3>

        <p>
            A heap is a special tree-based data structure
            that satisfies the heap property.
        </p>

        <p>
            A heap is generally represented as a complete
            binary tree.
        </p>

        <h4>Types of Heap</h4>

        <p>
            <b>1. Max Heap:</b>
            In a Max Heap, the parent node is greater than
            or equal to its children. The maximum element
            is present at the root.
        </p>

        <p>
            <b>2. Min Heap:</b>
            In a Min Heap, the parent node is smaller than
            or equal to its children. The minimum element
            is present at the root.
        </p>

        <p>
            Heaps are commonly used in priority queues and
            heap sort.
        </p>
    `,

        "Explain the following terms: a) Stack b) Queue c) Linked List.": `
        <h3>Stack</h3>

        <p>
            A stack is a linear data structure in which
            insertion and deletion are performed from one end
            called the <b>TOP</b>.
        </p>

        <p>
            Stack follows the <b>LIFO (Last In First Out)</b>
            principle.
        </p>

        <h3>Queue</h3>

        <p>
            A queue is a linear data structure in which
            insertion is performed at the rear and deletion
            is performed from the front.
        </p>

        <p>
            Queue follows the <b>FIFO (First In First Out)</b>
            principle.
        </p>

        <h3>Linked List</h3>

        <p>
            A linked list is a linear data structure consisting
            of nodes. Each node contains data and a link to the
            next node.
        </p>
    `,

    "Define Queue. Explain Priority Queue and Deque.": `
        <h3>Queue</h3>

        <p>
            A queue is a linear data structure in which insertion
            is performed at the rear and deletion is performed
            from the front.
        </p>

        <p>
            Queue follows the <b>FIFO (First In First Out)</b>
            principle.
        </p>

        <h3>Priority Queue</h3>

        <p>
            A priority queue is a type of queue in which each
            element is assigned a priority. The element with
            higher priority is served before an element with
            lower priority.
        </p>

        <h3>Deque</h3>

        <p>
            Deque stands for <b>Double Ended Queue</b>. It is a
            queue in which insertion and deletion can be performed
            from both the front and rear ends.
        </p>
    `,

    "Write a python program for Queue Using Linked List.": `
        <h3>Queue Using Linked List</h3>

        <p>
            The following Python program implements a queue
            using a linked list.
        </p>

        <pre>
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class Queue:
    def __init__(self):
        self.front = None
        self.rear = None

    def enqueue(self, data):
        new_node = Node(data)

        if self.rear is None:
            self.front = self.rear = new_node
            return

        self.rear.next = new_node
        self.rear = new_node

    def dequeue(self):
        if self.front is None:
            print("Queue is empty")
            return

        data = self.front.data
        self.front = self.front.next

        if self.front is None:
            self.rear = None

        return data

    def display(self):
        temp = self.front

        while temp:
            print(temp.data, end=" ")
            temp = temp.next


q = Queue()

q.enqueue(10)
q.enqueue(20)
q.enqueue(30)

q.display()

print("\\nDeleted:", q.dequeue())

q.display()
        </pre>
    `,

        /* =========================
       STACK
    ========================= */

    "Explain the following terms: a) Stack b) Queue c) Linked List.": `
        <h3>Stack</h3>

        <p>
            A stack is a linear data structure in which
            insertion and deletion are performed from one end
            called the <b>TOP</b>.
        </p>

        <p>
            Stack follows the <b>LIFO (Last In First Out)</b>
            principle.
        </p>

        <h3>Queue</h3>

        <p>
            A queue is a linear data structure in which
            insertion is performed at the rear and deletion
            is performed from the front.
        </p>

        <p>
            Queue follows the <b>FIFO (First In First Out)</b>
            principle.
        </p>

        <h3>Linked List</h3>

        <p>
            A linked list is a linear data structure consisting
            of nodes. Each node contains data and a link to the
            next node.
        </p>
    `,

    "Write a python program to implement Stack.": `
        <h3>Python Program to Implement Stack</h3>

        <p>
            A stack can be implemented in Python using a list.
            The <b>append()</b> operation is used to insert an
            element and <b>pop()</b> is used to remove an element.
        </p>

        <pre>
stack = []

def push():
    element = input("Enter element: ")
    stack.append(element)
    print("Element pushed:", element)

def pop():
    if not stack:
        print("Stack is empty")
    else:
        print("Element popped:", stack.pop())

def display():
    if not stack:
        print("Stack is empty")
    else:
        print("Stack:", stack)

while True:
    print("\\n1. Push")
    print("2. Pop")
    print("3. Display")
    print("4. Exit")

    choice = int(input("Enter your choice: "))

    if choice == 1:
        push()

    elif choice == 2:
        pop()

    elif choice == 3:
        display()

    elif choice == 4:
        break

    else:
        print("Invalid choice")
        </pre>
    `,

    "With the help of algorithm explain four operations on stack": `
        <h3>Four Operations on Stack</h3>

        <p>
            A stack follows the <b>LIFO (Last In First Out)</b>
            principle. The four basic operations performed on
            a stack are Push, Pop, Peek and Display.
        </p>

        <h4>1. Push</h4>

        <p>
            Push operation is used to insert an element into
            the stack.
        </p>

        <pre>
Algorithm PUSH(STACK, TOP, ITEM)

1. If TOP = MAX - 1
      Print "Stack Overflow"
      Exit
2. TOP = TOP + 1
3. STACK[TOP] = ITEM
4. Exit
        </pre>

        <h4>2. Pop</h4>

        <p>
            Pop operation is used to remove the top element
            from the stack.
        </p>

        <pre>
Algorithm POP(STACK, TOP)

1. If TOP = -1
      Print "Stack Underflow"
      Exit
2. ITEM = STACK[TOP]
3. TOP = TOP - 1
4. Return ITEM
        </pre>

        <h4>3. Peek</h4>

        <p>
            Peek operation is used to view the top element
            without removing it.
        </p>

        <pre>
Algorithm PEEK(STACK, TOP)

1. If TOP = -1
      Print "Stack is Empty"
      Exit
2. Return STACK[TOP]
        </pre>

        <h4>4. Display</h4>

        <p>
            Display operation is used to display all the
            elements present in the stack.
        </p>

        <pre>
Algorithm DISPLAY(STACK, TOP)

1. If TOP = -1
      Print "Stack is Empty"
      Exit
2. Repeat from TOP to 0
      Print STACK[i]
3. Exit
        </pre>
    `,


    /* =========================
       HTML
    ========================= */

    "List the different advantages and disadvantages of HTML.": `
        <h3>Advantages of HTML</h3>

        <ol>
            <li>HTML is easy to learn and understand.</li>
            <li>It is simple to use for creating web pages.</li>
            <li>HTML is supported by all major web browsers.</li>
            <li>It is a free and open standard.</li>
            <li>HTML can be combined with CSS and JavaScript.</li>
        </ol>

        <h3>Disadvantages of HTML</h3>

        <ol>
            <li>HTML is mainly used for creating static web pages.</li>
            <li>It cannot perform complex programming operations by itself.</li>
            <li>Large HTML documents can become difficult to maintain.</li>
            <li>HTML requires CSS and JavaScript for advanced styling and functionality.</li>
            <li>Different browsers may sometimes interpret HTML differently.</li>
        </ol>
    `,

    "Briefly explain what are Void, Block, Inline elements in HTML.": `
        <h3>Void Elements</h3>

        <p>
            Void elements are HTML elements that do not have
            closing tags and cannot contain any child elements.
        </p>

        <p>
            Examples:
            <b>&lt;br&gt;</b>,
            <b>&lt;img&gt;</b>,
            <b>&lt;hr&gt;</b>,
            <b>&lt;input&gt;</b>
        </p>

        <h3>Block Elements</h3>

        <p>
            Block elements normally start on a new line and
            occupy the available width of their container.
        </p>

        <p>
            Examples:
            <b>&lt;div&gt;</b>,
            <b>&lt;p&gt;</b>,
            <b>&lt;h1&gt;</b>,
            <b>&lt;section&gt;</b>
        </p>

        <h3>Inline Elements</h3>

        <p>
            Inline elements do not normally start on a new line.
            They occupy only the space required by their content.
        </p>

        <p>
            Examples:
            <b>&lt;span&gt;</b>,
            <b>&lt;a&gt;</b>,
            <b>&lt;b&gt;</b>,
            <b>&lt;strong&gt;</b>
        </p>
    `,

    "What is CSS in HTML? How to create a Internal CSS in HTML write with example.": `
        <h3>CSS in HTML</h3>

        <p>
            CSS stands for <b>Cascading Style Sheets</b>.
            It is used to control the appearance and layout
            of HTML elements on a web page.
        </p>

        <h3>Internal CSS</h3>

        <p>
            Internal CSS is written inside the
            <b>&lt;style&gt;</b> tag within the
            <b>&lt;head&gt;</b> section of an HTML document.
        </p>

        <h4>Example:</h4>

        <pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;

&lt;head&gt;

&lt;style&gt;

body {
    background-color: lightblue;
}

h1 {
    color: blue;
    text-align: center;
}

&lt;/style&gt;

&lt;/head&gt;

&lt;body&gt;

&lt;h1&gt;Welcome to HTML&lt;/h1&gt;

&lt;/body&gt;

&lt;/html&gt;
        </pre>

        <p>
            In this example, the CSS written inside the
            <b>&lt;style&gt;</b> tag is applied to the HTML page.
        </p>
    `,


    /* =========================
       JAVASCRIPT
    ========================= */

    "Define Java Script and write a JavaScript program to display Hello on click of button.": `
        <h3>JavaScript</h3>

        <p>
            JavaScript is a scripting language used to make
            web pages interactive and dynamic.
        </p>

        <p>
            It can be used to handle events, validate forms,
            modify HTML content and perform various operations
            on a web page.
        </p>

        <h4>Program:</h4>

        <pre>
&lt;!DOCTYPE html&gt;
&lt;html&gt;

&lt;body&gt;

&lt;button onclick="showHello()"&gt;
    Click Me
&lt;/button&gt;

&lt;script&gt;

function showHello() {
    alert("Hello");
}

&lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;
        </pre>

        <p>
            When the button is clicked, the
            <b>showHello()</b> function is called and
            displays "Hello".
        </p>
    `,

    "Demonstrate the different types of popup boxes used in JavaScript with example.": `
        <h3>Popup Boxes in JavaScript</h3>

        <p>
            JavaScript provides popup boxes to display
            messages, accept input and obtain confirmation
            from the user.
        </p>

        <h4>1. Alert Box</h4>

        <p>
            An alert box is used to display a message to
            the user.
        </p>

        <pre>
alert("Welcome to JavaScript");
        </pre>

        <h4>2. Confirm Box</h4>

        <p>
            A confirm box is used to ask the user to confirm
            or cancel an action.
        </p>

        <pre>
confirm("Do you want to continue?");
        </pre>

        <h4>3. Prompt Box</h4>

        <p>
            A prompt box is used to accept input from the user.
        </p>

        <pre>
let name = prompt("Enter your name");
        </pre>

        <p>
            Thus, the main popup boxes in JavaScript are
            <b>alert()</b>, <b>confirm()</b> and <b>prompt()</b>.
        </p>
    `,

    "Write a short note on JavaScript RegExp.": `
        <h3>JavaScript RegExp</h3>

        <p>
            RegExp stands for <b>Regular Expression</b>.
            It is a pattern used to match and search text
            in JavaScript.
        </p>

        <p>
            Regular expressions are commonly used for
            searching, replacing and validating strings.
        </p>

        <h4>Syntax:</h4>

        <pre>
let pattern = /hello/;
        </pre>

        <h4>Example:</h4>

        <pre>
let text = "Hello World";

let pattern = /Hello/;

console.log(pattern.test(text));
        </pre>

        <p>
            The <b>test()</b> method checks whether the pattern
            exists in the given string and returns true or false.
        </p>

        <h4>Common RegExp Methods</h4>

        <ul>
            <li><b>test()</b> - checks whether a pattern exists.</li>
            <li><b>match()</b> - finds matching text.</li>
            <li><b>replace()</b> - replaces matching text.</li>
            <li><b>search()</b> - searches for a pattern in a string.</li>
        </ul>
    `,

        /* =========================
       AJAX
    ========================= */

    "Demonstrate how asynchronous requests is handled using AJAX.": `
        <h3>AJAX</h3>

        <p>
            AJAX stands for <b>Asynchronous JavaScript and XML</b>.
            It allows a web page to communicate with a server
            asynchronously without reloading the complete page.
        </p>

        <h4>Handling an Asynchronous Request</h4>

        <ol>
            <li>User performs an action on the web page.</li>
            <li>JavaScript creates an AJAX request.</li>
            <li>The request is sent asynchronously to the server.</li>
            <li>The server processes the request and sends a response.</li>
            <li>JavaScript receives the response.</li>
            <li>The required part of the web page is updated without reloading the page.</li>
        </ol>

        <h4>Example:</h4>

        <pre>
let xhr = new XMLHttpRequest();

xhr.open("GET", "data.txt", true);

xhr.onload = function() {
    if (xhr.status == 200) {
        document.getElementById("result").innerHTML =
            xhr.responseText;
    }
};

xhr.send();
        </pre>
    `,

    "Describe importance of AJAX in web development.": `
        <h3>Importance of AJAX in Web Development</h3>

        <p>
            AJAX is important in web development because it allows
            web pages to exchange data with a server without
            reloading the entire page.
        </p>

        <ul>
            <li>It provides asynchronous communication with the server.</li>
            <li>It reduces the need for complete page reloads.</li>
            <li>It makes web applications more interactive.</li>
            <li>It can reduce the amount of data transferred between client and server.</li>
            <li>It improves the responsiveness of web applications.</li>
            <li>It allows only the required portion of a web page to be updated.</li>
        </ul>
    `,

    "What are the different Technologies are included in AJAX.": `
        <h3>Technologies Used in AJAX</h3>

        <p>
            AJAX is not a single technology. It is a combination
            of several web technologies.
        </p>

        <ol>
            <li>
                <b>HTML:</b>
                Used to create the structure of web pages.
            </li>

            <li>
                <b>CSS:</b>
                Used to design and style web pages.
            </li>

            <li>
                <b>JavaScript:</b>
                Used to make web pages interactive and handle
                asynchronous requests.
            </li>

            <li>
                <b>DOM:</b>
                Used by JavaScript to access and modify the
                content and structure of a web page.
            </li>

            <li>
                <b>XMLHttpRequest:</b>
                Used to communicate with the server asynchronously.
            </li>

            <li>
                <b>XML / JSON:</b>
                Used for exchanging data between the client
                and server.
            </li>
        </ol>
    `,


    /* =========================
       INHERITANCE
    ========================= */

    "Demonstrate Hierarchical Inheritance with suitable example.": `
        <h3>Hierarchical Inheritance</h3>

        <p>
            Hierarchical inheritance is a type of inheritance
            in which multiple child classes inherit properties
            and methods from a single parent class.
        </p>

        <h4>Example:</h4>

        <pre>
class Animal:
    def eat(self):
        print("Eating")


class Dog(Animal):
    def bark(self):
        print("Barking")


class Cat(Animal):
    def meow(self):
        print("Meowing")


d = Dog()
d.eat()
d.bark()

c = Cat()
c.eat()
c.meow()
        </pre>

        <p>
            Here, <b>Dog</b> and <b>Cat</b> both inherit from
            the common parent class <b>Animal</b>. This is called
            hierarchical inheritance.
        </p>
    `,


    /* =========================
       MULTITHREADING
    ========================= */

    "Explain multithreading with example.": `
        <h3>Multithreading</h3>

        <p>
            Multithreading is a process of executing multiple
            threads concurrently within a program.
            A thread is a lightweight unit of execution.
        </p>

        <p>
            Multithreading helps a program perform multiple
            tasks at the same time and can improve the
            responsiveness of an application.
        </p>

        <h4>Example in Java:</h4>

        <pre>
class MyThread extends Thread {

    public void run() {
        System.out.println("Thread is running");
    }
}

class Main {
    public static void main(String args[]) {

        MyThread t1 = new MyThread();

        t1.start();
    }
}
        </pre>

        <p>
            In this example, the <b>MyThread</b> class extends
            the <b>Thread</b> class and overrides the
            <b>run()</b> method. The <b>start()</b> method
            starts the thread.
        </p>
    `,


    /* =========================
       SUDOKU
    ========================= */

    "Find partition of 6 and 7? Explain What is ‘Sudoku Puzzle’?": `
        <h3>Partition</h3>

        <p>
            A partition of a positive integer is a way of
            writing it as a sum of positive integers where
            the order of the terms is not considered.
        </p>

        <h4>Partitions of 6:</h4>

        <p>
            6
        </p>

        <p>
            5 + 1
        </p>

        <p>
            4 + 2
        </p>

        <p>
            4 + 1 + 1
        </p>

        <p>
            3 + 3
        </p>

        <p>
            3 + 2 + 1
        </p>

        <p>
            3 + 1 + 1 + 1
        </p>

        <p>
            2 + 2 + 2
        </p>

        <p>
            2 + 2 + 1 + 1
        </p>

        <p>
            2 + 1 + 1 + 1 + 1
        </p>

        <p>
            1 + 1 + 1 + 1 + 1 + 1
        </p>

        <h4>Partitions of 7:</h4>

        <p>
            7
        </p>

        <p>
            6 + 1
        </p>

        <p>
            5 + 2
        </p>

        <p>
            5 + 1 + 1
        </p>

        <p>
            4 + 3
        </p>

        <p>
            4 + 2 + 1
        </p>

        <p>
            4 + 1 + 1 + 1
        </p>

        <p>
            3 + 3 + 1
        </p>

        <p>
            3 + 2 + 2
        </p>

        <p>
            3 + 2 + 1 + 1
        </p>

        <p>
            3 + 1 + 1 + 1 + 1
        </p>

        <p>
            2 + 2 + 2 + 1
        </p>

        <p>
            2 + 2 + 1 + 1 + 1
        </p>

        <p>
            2 + 1 + 1 + 1 + 1 + 1
        </p>

        <p>
            1 + 1 + 1 + 1 + 1 + 1 + 1
        </p>

        <h3>Sudoku Puzzle</h3>

        <p>
            Sudoku is a logic-based number puzzle played on
            a 9 × 9 grid.
        </p>

        <p>
            The objective is to fill the grid so that each row,
            each column and each 3 × 3 sub-grid contains the
            numbers 1 to 9 without repetition.
        </p>
    `,


    /* =========================
       MATRIX / GRAPH
    ========================= */

    "[Graph shown in paper] (i) Find degree of each vertex (ii) Find adjacency matrix and incidence matrix.": `
        <h3>Graph</h3>

        <p>
            The degree of a vertex is the number of edges
            incident with that vertex.
        </p>

        <h3>Degree of Each Vertex</h3>

        <p>
            The degree of each vertex is obtained by counting
            the number of edges connected to that vertex.
        </p>

        <h3>Adjacency Matrix</h3>

        <p>
            An adjacency matrix is a square matrix in which
            the entry at position (i, j) represents whether
            there is an edge between vertex i and vertex j.
        </p>

        <h3>Incidence Matrix</h3>

        <p>
            An incidence matrix represents the relationship
            between vertices and edges. Rows represent vertices
            and columns represent edges.
        </p>

        <p>
            <b>Note:</b> The actual graph image is required to
            calculate the exact vertex degrees, adjacency matrix
            and incidence matrix.
        </p>
    `,


    /* =========================
       CLOUD COMPUTING
    ========================= */

    "What is cloud computing? Explain the benefits of cloud computing.": `
        <h3>Cloud Computing</h3>

        <p>
            Cloud computing is the delivery of computing
            resources such as servers, storage, databases,
            networking and software over the Internet.
        </p>

        <h3>Benefits of Cloud Computing</h3>

        <ol>
            <li>
                <b>Cost Reduction:</b>
                It reduces the need for purchasing and maintaining
                physical infrastructure.
            </li>

            <li>
                <b>Scalability:</b>
                Computing resources can be increased or decreased
                according to requirements.
            </li>

            <li>
                <b>Accessibility:</b>
                Resources can be accessed through the Internet
                from different locations.
            </li>

            <li>
                <b>Flexibility:</b>
                Users can select resources according to their needs.
            </li>

            <li>
                <b>Backup and Recovery:</b>
                Cloud services can provide facilities for storing
                and recovering data.
            </li>

            <li>
                <b>Maintenance:</b>
                The cloud provider manages much of the underlying
                infrastructure.
            </li>
        </ol>
    `,

    "Compare between cloud computing & virtualization with the help of various key points.": `
        <h3>Cloud Computing vs Virtualization</h3>

        <table border="1" cellpadding="8" cellspacing="0">
            <tr>
                <th>Cloud Computing</th>
                <th>Virtualization</th>
            </tr>

            <tr>
                <td>
                    Provides computing resources and services
                    over a network or Internet.
                </td>
                <td>
                    Creates virtual versions of computing
                    resources such as servers or operating systems.
                </td>
            </tr>

            <tr>
                <td>
                    Provides services such as storage,
                    computing and applications.
                </td>
                <td>
                    Mainly provides an abstraction layer over
                    physical hardware.
                </td>
            </tr>

            <tr>
                <td>
                    Can use virtualization as an underlying technology.
                </td>
                <td>
                    Can be used to build the infrastructure
                    used by cloud services.
                </td>
            </tr>

            <tr>
                <td>
                    Resources can be accessed remotely through
                    a network.
                </td>
                <td>
                    Virtual resources can run on a physical
                    machine.
                </td>
            </tr>

            <tr>
                <td>
                    Examples include cloud storage and cloud
                    computing services.
                </td>
                <td>
                    Examples include virtual machines and
                    virtual networks.
                </td>
            </tr>
        </table>
    `,

    "Explain the different cloud computing challenges.": `
        <h3>Challenges of Cloud Computing</h3>

        <ol>
            <li>
                <b>Security:</b>
                Protecting data and resources from unauthorized
                access is an important challenge.
            </li>

            <li>
                <b>Privacy:</b>
                Sensitive information is stored and processed
                on cloud infrastructure.
            </li>

            <li>
                <b>Availability:</b>
                Cloud services depend on network and service
                availability.
            </li>

            <li>
                <b>Data Loss:</b>
                Data may be lost due to failures or improper
                backup and recovery procedures.
            </li>

            <li>
                <b>Vendor Lock-in:</b>
                Moving applications and data from one cloud
                provider to another can sometimes be difficult.
            </li>

            <li>
                <b>Performance:</b>
                Network conditions and resource availability
                can affect application performance.
            </li>

            <li>
                <b>Compliance:</b>
                Cloud systems may need to satisfy different
                legal and regulatory requirements.
            </li>
        </ol>
    `,
};