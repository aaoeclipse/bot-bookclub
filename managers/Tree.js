function Node(data) {
    this.data = data;
    this.children = [];
}
Node.prototype.toString = function nodeString() {
    return `${this.data} [${this.children}]`
};

class Tree {
    constructor() {
        this.root = null;
    }

    add(data, toNodeData) {
        const node = new Node(data);

        // Breath first search
        const parent = toNodeData ? this.findBFS(toNodeData) : null; // if defined

        if(parent)
            parent.children.push(node);
        else
            if(!this.root)
                this.root = node;
            else
                return "Tried to store node at root when root already exists"
    }

    findBFS(data){
        let _node = null;

        this.traverseBFS((node) => {
            if(node.data == data)
                _node = node;
        });

        return _node;
    }

    traverseBFS(cb){
        const queue = [this.root];

        if (cb)
            while(queue.length){
                const node = queue.shift();

                cb(node)

                node.children.forEach(child => {
                    queue.push(child);
                });
            }
    }

 

}

(function test(){
    let tree = new Tree();

    tree.add("Node1");
    tree.add("Node2", "Node1");
    tree.add("Node3", "Node1");

    tree.traverseBFS((node) => {console.log(`Current node ${node}`)})
})()
module.exports = Tree;

