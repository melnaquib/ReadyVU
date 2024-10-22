import sys
import xmltodict
from pprint import pprint

def txtBlock(nodes, edges, node):
    template = """

predicate task___NODE_ID__ {
    var sender: b256;
    var datum: datum;

    state current_state_id: int = mut storage::current_state_id;
    constraint sender == __ASSIGNEE__;
    state datum = mut storage::data[current_state_id];
    constraint __TRS_CONSTRAINTS__;

}
    """
    fn = lambda e: "current_state_id' == " + str(e)
    targets_constraints = map(fn, edges[node])
    targets_constraint = " || ".join(targets_constraints)
    res = template.replace("__TRS_CONSTRAINTS__", targets_constraint).replace("__ASSIGNEE__", str(nodes[node]["owner"]));
    return res


def iid(id):
    return hash(id)

def bpmn2pint(bpmn):
    res = """
storage {
    current_state_id: int,
    data: (int => int),

}

predicate Initialize {
    state current_state_id: int = mut storage::current_state_id;
    constraint current_state_id' == 0';
}

"""
    srcd = xmltodict.parse(bpmn)
    nodes = {}
    edges = {}
    # pprint(srcd, compact=True)
        
    cs = {}

    processes = srcd['bpmn:definitions']["bpmn:process"]
    for p in processes:
        # p = pprocesses[i]
        pid=iid(p["@id"])
        tasks = p["bpmn:task"]
        if not isinstance(tasks, list):
            tasks = [tasks]
        for task in tasks:
            id = iid(task["@id"])
            nodes[id] = {
                "id": id,
                "owner": pid
            }
        if "bpmn:startEvent" in p:
            id = iid(p["bpmn:startEvent"]["@id"])
            nodes[id] = {
                "id": id,
                "owner": pid
            }
        if "bpmn:endEvent" in p:
            id = iid(p["bpmn:startEvent"]["@id"])
            nodes[id] = {
                "id": id,
                "owner": pid
            }

        seqFlows = p["bpmn:sequenceFlow"] if "bpmn:sequenceFlow" in p else []
        for f in seqFlows:
            cs[f["@id"]] = [f["@sourceRef"], f["@targetRef"]]


    msgFlows = srcd['bpmn:definitions']["bpmn:collaboration"]["bpmn:messageFlow"]
    for f in msgFlows:
        cs[f["@id"]] = [f["@sourceRef"], f["@targetRef"]]

    process = srcd['bpmn:definitions']['bpmn:process']

    for c in cs:
        src = iid(cs[c][0])
        if src not in edges:
            edges[src] = []
        edges[src].append(iid(cs[c][0]))

    nodes_txtBlocks = map(lambda node: txtBlock(nodes, edges, node), nodes);

    res = res + "\n".join(nodes_txtBlocks)

    return res; 


def cvt_file(src):
    # print(sys.path[0]);
    pint_text = ""
    with open(src, 'r') as f:
        bpmn_text = f.read()
        pint_text = bpmn2pint(bpmn_text)
    return pint_text


def main():
    src = sys.argv[1]
    # src = "data/test/bpmn/process1.bpmn"
    # print(src)
    res = cvt_file(src)
    print(res)


if __name__ == "__main__":
    main()
