let url = "https://crudcrud.com/api/598e0e7f6c814590a4cebbaec1725ffc/candy";
function clearFields()
{
    document.getElementById("candyName").value="";
    document.getElementById("description").value="";
    document.getElementById("price").value="";
    document.getElementById("avalability").value="";
}

document.getElementById("submit").addEventListener("click", addData);

document.onload = showData();

async function addData()
{
    let candyName = document.getElementById("candyName").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let avalability = document.getElementById("avalability").value;
 
    let candyList = { candyName: candyName, description: description, price: price, avalability: avalability };

    try{
        await axios.post(url, candyList)
        
            showData();
        
            clearFields();
    }
    catch(err)
    {
        console.log(err);
    }

} 

async function showData()
{
    let res = await axios.get(url);
    const candyList = res.data;
    //console.log(candyList);
    let html = "";
    candyList.forEach((element,index) => {
        html+="<tr>";
        html+="<td>"+element.candyName+"</td>";   
        html+="<td>"+element.description+"</td>";   
        html+="<td>"+element.price+"</td>";   
        html+="<td>"+element.avalability+"</td>";
        html+= '<td><button onclick="buy1('+index+
        ')" class="btn btn-primary">Buy1</button><button onclick="buy2('+index+
        ')" class="btn btn-primary m-2">Buy2</button><button onclick="buy3('+index+
        ')" class="btn btn-primary m-2">Buy3</button></td>';
        html += '<td><button onclick="deleteData(\'' + element._id + '\')" class="btn btn-danger">Delete</button></td>';
    html+="</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML = html;
}

async function buy1(index)
{
    let res = await axios.get(url);
    const candyList = res.data;
    let i = candyList[index]._id;
    let ca = Number(candyList[index].avalability);
    if(ca<1)
    {
        alert("Sorry, Candy is not available");
        return;
    }
    //console.log("Current Availability= "+ca);
    let ul = { candyName: candyList[index].candyName, description: candyList[index].description, price: candyList[index].price, avalability: ca-1 };
    
    await axios.put(url+"/"+i, ul)
    .then(function(){
        showData();
    })
    
}
async function buy2(index)
{
    let res = await axios.get(url);
    const candyList = res.data;
    let i = candyList[index]._id;
    let ca = Number(candyList[index].avalability);
    if(ca<2)
    {
        alert("Sorry, Candy is not available");
        return;
    }
    //console.log("Current Availability= "+ca);
    let ul = { candyName: candyList[index].candyName, description: candyList[index].description, price: candyList[index].price, avalability: ca-2 };
    
    await axios.put(url+"/"+i, ul)
    .then(function(){
        showData();
    })
    
    //console.log("Buy 2 works")
}
async function buy3(index)
{
    let res = await axios.get(url);
    const candyList = res.data;
    let i = candyList[index]._id;
    let ca = Number(candyList[index].avalability);
    if(ca<1)
    {
        alert("Sorry, Candy is not available");
        return;
    }
    //console.log("Current Availability= "+ca);
    let ul = { candyName: candyList[index].candyName, description: candyList[index].description, price: candyList[index].price, avalability: ca-3 };
    
    await axios.put(url+"/"+i, ul)
    .then(function(){
        showData();
    })
    
    //console.log("Buy 3 works")
}


async function deleteData(id) {
    try {
        await axios.delete(url + "/" + id);
        showData();
    } catch (err) {
        console.log(err);
    }
}


