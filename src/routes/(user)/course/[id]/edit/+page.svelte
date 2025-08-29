<script>
    import {page} from "$app/state";
    import {alertError, alertSuccess} from "$lib/alert.js";
    import {onMount} from "svelte";
    import {courseGet, coursePatch} from "$lib/api/CourseApi.js";

    const {id} = page.params;
    let course = $state({
        name: '',
        code: '',
        credit: ''
    });

    async function courseUpdate(e) {
        e.preventDefault();

        const response = await coursePatch(id, course);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            await alertSuccess();
        } else {
            await alertError(responseBody.message);
        }
    }

    async function courseDetail() {
        const response = await courseGet(id);
        const responseBody = await response.json();

        if (responseBody.statusCode === 200) {
            course = responseBody.data;
        } else {
            await alertError(responseBody.message);
        }
    }

    onMount(async () => {
        await courseDetail();
    });
</script>
<section class="p-6 bg-white rounded-2xl shadow-md mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-700">Course Edit</h2>

    <form onsubmit={courseUpdate}>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
                    id="name"
                    type="text"
                    bind:value={course.name}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Code</label>
            <input
                    id="name"
                    type="text"
                    bind:value={course.code}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Credit</label>
            <input
                    id="name"
                    type="number"
                    bind:value={course.credit}
                    class="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div class="flex justify-end gap-3 mt-4">
            <button type="submit"
                    class="bg-yellow-400 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                <i class="fas fa-plus-circle mr-2"></i>Save Changes
            </button>
            <a class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
               href="/course">
                Back
            </a>
        </div>
    </form>
</section>