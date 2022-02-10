var os=0, brand=0;
var products = 
[{
	"id": "100",
	"name": "iPhone 4S",
	"brand": "Apple",
	"os": "iOS"
},
{
	"id": "101",
	"name": "Moto X",
	"brand": "Motorola",
	"os": "Android"	
},
{
	"id": "102",
	"name": "iPhone 6",
	"brand": "Apple",
	"os": "iOS"
},
{
	"id": "103",
	"name": "Samsung Galaxy S",
	"brand": "Samsung",
	"os": "Android"
},
{
	"id": "104",
	"name": "Google Nexus",
	"brand": "ASUS",
	"os": "Android"
},
{
	"id": "105",
	"name": "Surface",
	"brand": "Microsoft",
	"os": "Windows"
}];

$("documnet").ready(function()
{

	//Adding search input option
	$("#main").append(`<input type="text" id="searchData" placeholder="Search....">`);
					
	//Adding select inside display
	selectAddition();
					
	//Selecting the table to display the content
	$("#tableData").on("click",".delete",function()
	{
		$(this).hide();
	});

					
	display(products);//Displaying the content

	//Adding search option on our page
	$("#main").on("keyup","#searchData",function()
	{
		var a=$(this).val();
		searchData(a,products);
	})
					
	//
	$("#brand").click(function()
	{
		brand= $(this).val();
		console.log(brand +" "+os);
		filterData(brand,os, products);
	});

	$("#os").click(function()
	{
		os=$(this).val();
		filterData(brand,os, products);
	});
});

//function to display the content on the window screen
function display(products)
{
	$("#tableData").html(`<tr>
	<th>ID</th>
	<th>Name</th>
	<th>Brand</th>
	<th>Operating System</th>
	<th>Remove</th>
	</tr>`)
	for(i=0;i<products.length;i++)
	{
		$("#tableData").append(`<tr class="delete">
		<td>${products[i].id}</td>
		<td>${products[i].name}</td>
		<td>${products[i].brand}</td>
		<td>${products[i].os}</td>
		<td class="remove" data-id=${products[i].id}>x</td>
		</tr>`);
	}
}	

//function to perform the search operation of search bar
function searchData(data, product)
{
	var newData=[];
	var data=data.toLowerCase();
	console.log(data);
	for(i=0;i<product.length;i++)
	{
		let name=product[i].name.toLowerCase();
		let id=product[i].id;
		if(name.includes(data)||id.includes(data))
		{
			newData.push(product[i]);
		}
	}
	display(newData);
}


//function to perform the filter operation
function filterData(brand, os,product)
{
	var filterArray=[];
	var comboArray=[];
	var count=0;
					
	for(i=0;i<product.length;i++)
	{
		var previousOS=product[i].os;
		var previousBrand=product[i].brand;

		if(brand == previousBrand && (os == "Select" || os == 0))
		{
			filterArray.push(product[i]);
		}
		else if((brand == "Select" || brand == 0) && os == previousOS)
		{
			filterArray.push(product[i]);
		}	
		else if(brand == "Select" && os == "Select")
		{
			display(product);
			return;
		}
		else
		{
			if(brand == previousBrand && os == previousOS)
			{
				comboArray.push(product[i]);
				count++;
			}
		}
	}
	if(count!=0)
	{
		display(comboArray);
	}
	else
	{
		display(filterArray);
	}
}
			
//function to insert the select option on our page
function selectAddition()
{
	$("#tableData").before(`<select id="brand" name="brand" placeholder="Brand">
	<option>Select</option>
	<option>Motorola</option>
	<option>Samsung</option>
	<option>ASUS</option>
	<option>Apple</option>
	<option>Microsoft</option>
	</select>
	<select id="os" name="os" value="Select" placeholder="Operating System">
	<option>Select</option>
	<option>iOS</option>
	<option>Android</option>
	<option>Windows</option>
	</select>`);

}