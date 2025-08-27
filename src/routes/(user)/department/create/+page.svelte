<script>
    import {departmentPost} from "$lib/api/DepartmentApi.js";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {goto} from "$app/navigation";

    let department = $state({
       name: ''
    });

    async function departmentCreate(e) {
        e.preventDefault();

        const response = await departmentPost(department);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            await alertSuccess('create department successfully');
            await goto('/department');
        } else {
            await alertError(responseBody.message);
        }
    }
</script>
<section class="p-6 bg-white rounded-2xl shadow-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-700">Department Add</h2>

    <form onsubmit={departmentCreate}>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
                    id="name"
                    type="text"
                    bind:value={department.name}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="flex justify-end gap-3 mt-4">
            <button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                <i class="fas fa-plus-circle mr-2"></i>Save
            </button>
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/department">
                Back
            </a>
        </div>
    </form>
</section>