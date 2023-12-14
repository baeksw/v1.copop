
function LoadAddForm() {
	this.api = "{% url 'register.master.create' %}"
	console.log(this.api)
	$.get(this.api, function(data) {
		$('.new-modal').html(data);
	});
}

function LoadUpdateForm(pk) {
	this.api = "{% url 'register.master.update' '000' %}";
	this.api = this.api.replace('000', pk)

	$.get(this.api, function(data) {
		$('.update-modal').html(data);
	});
	
}

function LoadTable() {
	this.api = "{% url 'register.master.list' %}"
	$.get(this.api, function(data) {
		//console.log(data)
		$('#id_table_view').html(data);
		
		$('#dataTable').DataTable({
			// order: [[0, 'desc']],
			aaSorting: [],
			ordering: true,
			language: {
				url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Korean.json"
			},
			drawCallback: function (settings) {
				$('#dataTable').css("display", "table");
			}
		});
		
		
		$('#dataTable tbody ').on('click', 'tr', function() {
			var row = $(this).closest('tr');
			//alert(row.text())
			//console.log($(row).html())
			const pk = $(row).attr('rid');
			const update = new LoadUpdateForm(pk);

			$('#newRegModal').modal('hide');
			$('#UpdateModal').modal('show')
			
			$('#id_update').on('click touch', function(){
				var api = "{% url 'register.master.update' '000' %}";
				api = api.replace('000', pk)

				var frm = $('#form_modal_UD');
				frm.attr('method', 'POST');
				frm.attr('action', api);
				frm.submit();
			})
			
			$('#id_delete').on('click touch', function(){
				var api = "{% url 'register.master.delete' '000' %}";
				api = api.replace('000', pk)

				var frm = $('#form_modal_UD');
				frm.attr('method', 'POST');
				frm.attr('action', api);
				frm.submit();
				
			});
		
		})
		   
	});
}

$(document).ready(function () {
	new LoadTable();

	$('#id_add').on('click touch', function(){
		new LoadAddForm();
		$('#UpdateModal').modal('hide')
		$('#newRegModal').modal('show');
	});

});
