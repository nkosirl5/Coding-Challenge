"""This module has the functions that get data from the database"""


import logging as log
#import io
from pandas import DataFrame


from test_database import (
    execute_queries_get_dataframes,
    exc_qrs_get_dfs)

log.basicConfig(level=log.DEBUG)
log.info('----- QRS_GETS.PY -----')

def get_table(table=None):
    """Gets all data needed to display map from the desk being scanned.

    Args:
        table=None (str): determines which table to return

    Return:
        response_object (obj): python object of returned dataframes of the following:
            "users_table" (df): if arg was user
            "data_table" (df): if arg was data"""
    log.info(">> get_table(table=None). table: %s", table)

    # ˅
    query_select_records = ("SELECT  data.id, person, (array_to_string(array_agg( distinct data_id), ',')) data_id from records inner join data on records.data_id = data.id WHERE EXISTS( SELECT 1 FROM records WHERE data.id=records.data_id ) GROUP BY person, data.id LIMIT 1")

    query_select_data = ("(SELECT id, (array_to_string(array_agg( distinct data.text), ',')) data_text, json from data GROUP BY id )")

    response_list = None
    query_list = [
        query_select_records,
        query_select_data]
    log.info("query list: %s", query_list)
    try:
        if table == "records":
            query_list = [query_select_records]
            # get the data
            response_list = exc_qrs_get_dfs(query_list)
            log.info("database responses: %s", response_list)

            response_object = {
                "records_table":response_list[0]}

        if table == "data":
            query_list = [query_select_data]
            # get the data
            response_list = exc_qrs_get_dfs(query_list)
            log.info("database responses: %s", response_list)

            response_object = {
                "data_table": response_list[0]}
        log.info("query list: %s", query_list)

    except Exception as error:
        log.info(error)
        return error

    return response_object
