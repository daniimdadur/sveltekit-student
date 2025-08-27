<script>
    import {page} from "$app/state";
    import {studentGet, studentPatch, studentPost} from "$lib/api/StudentApi.js";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {goto} from "$app/navigation";
    import {departmentGetList} from "$lib/api/DepartmentApi.js";
    import {onMount} from "svelte";

    const {id} = page.params;
    let student = $state({
        name: '',
        email: '',
        departmentId: '',
        departmentName: ''
    });

    let departments = $state([
        {
            id: '',
            name: ''
        }
    ]);

    async function studentUpdate(e) {
        e.preventDefault();

        const response = await studentPatch(id, student);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            await alertSuccess('update student successfully');
            await goto('/student');
        } else {
            await alertError(responseBody.message);
        }
    }

    async function studentDetail() {
        const response = await studentGet(id);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            student = responseBody.data;
        } else {
            await alertError(responseBody.message);
        }
    }

    async function departmentList() {
        const response = await departmentGetList();
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            departments = responseBody.data;
        } else {
            await alertError(responseBody.message);
        }
    }

    onMount(async () => {
        await departmentList();
        await studentDetail();
    });
</script>
<section class="p-6 bg-white rounded-2xl shadow-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-700">Student Edit</h2>

    <form onsubmit={studentUpdate}>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
                    id="name"
                    type="text"
                    bind:value={student.name}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Email</label>
            <input
                    id="name"
                    type="text"
                    bind:value={student.email}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="mb-4">
            <label for="department" class="block text-sm font-medium text-gray-600">Department</label>
            <select
                    id="department"
                    bind:value={student.departmentId}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
            >
                <option value="" disabled>Select Department</option>
                {#each departments as department}
                    <option value={department.id} selected={department.id === student.departmentId}>
                        {department.name}
                    </option>
                {/each}
            </select>
        </div>
        <div class="flex justify-end gap-3 mt-4">
            <button type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                <i class="fas fa-plus-circle mr-2"></i>Save
            </button>
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/student">
                Back
            </a>
        </div>
    </form>
</section>