<script>
    import {page} from "$app/state";
    import {alertError} from "$lib/alert.js";
    import {onMount} from "svelte";
    import {lecturerGet} from "$lib/api/LecturerApi.js";
    import {courseGet} from "$lib/api/CourseApi.js";

    const {id} = page.params;
    let course = $state({
        name: '',
        code: '',
        credit: ''
    });

    let lecturerCourses = $state([
        {
            courseName: '',
            role: '',
            status: ''
        }
    ]);

    let enrollments = $state([
        {
            courseName: '',
            grade: ''
        }
    ]);

    async function courseDetail() {
        const response = await courseGet(id);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            course = responseBody.data;
            lecturerCourses = responseBody.data.lecturerCourses;
            enrollments = responseBody.data.enrollments;
        } else {
            await alertError(responseBody.message);
        }
    }

    onMount(async () => {
        await courseDetail();
    });
</script>
<section class="p-6 bg-white rounded-2xl shadow-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-700">Course Detail</h2>

    <form class="space-y-4">
        <div>
            <label for="id" class="block text-sm font-medium text-gray-600">ID</label>
            <input
                    id="id"
                    type="text"
                    bind:value={course.id}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
                    id="name"
                    type="text"
                    bind:value={course.name}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Code</label>
            <input
                    id="name"
                    type="text"
                    bind:value={course.code}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-600">Credit</label>
            <input
                    id="name"
                    type="text"
                    bind:value={course.credit}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readonly
            />
        </div>
        {#if lecturerCourses && lecturerCourses.length > 0}
            <h2 class="text-2xl font-bold">Lecturer List</h2>
            <div class="overflow-x-auto bg-white rounded-2xl shadow">
                <table class="min-w-full border-collapse">
                    <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-6 py-3 text-left">#</th>
                        <th class="px-6 py-3 text-left">Course:</th>
                        <th class="px-6 py-3 text-left">Role</th>
                        <th class="px-6 py-3 text-left">Status</th>
                        <th class="px-6 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each lecturerCourses as lecturerCourse, index}
                        <tr class="border-t hover:bg-gray-50">
                            <th class="px-6 py-3">{index+1}</th>
                            <td class="px-6 py-3">{lecturerCourse.courseName}</td>
                            <td class="px-6 py-3">{lecturerCourse.role}</td>
                            <td class="px-6 py-3">{lecturerCourse.status}</td>
                            <td class="px-6 py-3 text-center space-x-2">
                                <a class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                   href="/lecturer/{lecturerCourse.id}">
                                    Details
                                </a>
                                <a class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                   href="/lecturer/{lecturerCourse.id}">
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
               href="/course">
                Back
            </a>
        </div>
    </form>
</section>