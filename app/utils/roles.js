// Reads a user's role from the `profiles` table.
// Falls back to 'user' if the profile / table is not set up yet, so the app
// keeps working before the SQL migration has been run.
export async function getUserRole(supabase, userId) {
    const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

    return data?.role ?? 'user';
}
