<script>
    import {page} from "$app/state";
    import {studentGet} from "$lib/api/StudentApi.js";
    import {alertError} from "$lib/alert.js";
    import {onMount} from "svelte";

    const {id} = page.params;
    let student = $state({
        name: '',
        email: '',
        departmentName: ''
    });

    let enrollments = $state([
        {
            courseName: '',
            grade: ''
        }
    ]);

    async function studentDetail() {
        const response = await studentGet(id);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            student = responseBody.data;
            enrollments = responseBody.data.enrollments;
        } else {
            await alertError(responseBody.message);
        }
    }

    onMount(async () => {
        await studentDetail();
    });
</script>
<section class="p-6 bg-white rounded-2xl shadow-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-700">Student Detail</h2>

    <form class="space-y-4">
        <div>
            <label for="id" class="block text-sm font-medium text-gray-600">ID</label>
            <input
                    id="id"
                    type="text"
                    bind:value={student.id}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
                    id="name"
                    type="text"
                    bind:value={student.name}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Email</label>
            <input
                    id="name"
                    type="text"
                    bind:value={student.email}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Department</label>
            <input
                    id="name"
                    type="text"
                    bind:value={student.departmentName}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        {#if enrollments && enrollments.length > 0}
            <h2 class="text-2xl font-bold">Enrollment List</h2>
            <div class="overflow-x-auto bg-white rounded-2xl shadow">
                <table class="min-w-full border-collapse">
                    <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-6 py-3 text-left">#</th>
                        <th class="px-6 py-3 text-left">Course:</th>
                        <th class="px-6 py-3 text-left">Grade</th>
                        <th class="px-6 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each enrollments as enrollment, index}
                        <tr class="border-t hover:bg-gray-50">
                            <th class="px-6 py-3">{index+1}</th>
                            <td class="px-6 py-3">{enrollment.courseName}</td>
                            <td class="px-6 py-3">{enrollment.grade}</td>
                            <td class="px-6 py-3 text-center space-x-2">
                                <a class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                   href="/enrollment/{enrollment.id}">
                                    Details
                                </a>
                                <a class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                   href="/enrollment/{enrollment.id}">
                                    Edit
                                </a>
                                <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        {/if}
        <div class="flex justify-end gap-3">
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/student">
                Back
            </a>
        </div>
    </form>
</section>