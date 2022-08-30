var edit;
$(document).ready(function () {

    $.ajax({

        url: "/Home/Data",
        type: 'GET',
        editor: true,
        dataType: 'json',
        success: function (data) {
            debugger;
            edit=  $('#myTable').DataTable({
                data: data,
                columns: [
                    { data: 'name', className: 'editable' },
                    { data: 'email' },
                    { data: 'adress' },
                    { data: 'distric' },

                    {
                        data: 'id',
                        'render': function (data, type, row, meta) {
                            getdataModel = {};
                            getdataModel.id = row.id;
                            getdataModel.name = row.name;
                            getdataModel.email = row.email;
                            getdataModel.adress = row.adress;
                            getdataModel.distric = row.distric;

                            return "<button type='button'  class='btn btn-primary " + row.Id + "' onclick=EditText() >Edit</button>&nbsp;<button onclick=Update('"+getdataModel.name+"')  >Update</button>";
                        }
                    },

                ]
            });
        },
        error: function (request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });

});

function EditText() {
    $("#myTable tr").find('td.editable').each(function () {
        var html = $(this).html();
        var input = $('<input class="editableColumnsStyle" type="text" />');
        input.val(html);
        $(this).html(input);
    });
}


function Update(name) {
    debugger;
    let fName = null;
    $("table > tbody > tr").each(function () {
        fName = $(".editableColumnsStyle").val();
    });

    $.ajax({
        type: 'POST',
        url: '/Home/Edit',
        data: { 'model': fName },
        dataType: "text",
        success: function (res) {
            debugger;
            console.log(res);
        }

    })

}

